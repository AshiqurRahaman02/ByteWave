import express, { Request, Response } from "express";
import SessionModel, { ISession } from "../models/session.model";
import openai from "../config/open-ai";

const sessionRouter = express.Router();

sessionRouter.post("/chat", async (req: Request, res: Response) => {
	try {
		const systemPromptMsg = "I want you to act as an interviewer. I will be the candidate and you will ask me the interview questions for the position of Backend Software Developer.That will require me to have the following content:Node basics,Express,Mongodb,Redis,web-sockets.I want you to only reply as the interviewer. Do not write all the conservation at once. I want you to only do the coding technical interview with me. Ask me the questions and wait for my answers. I will say the phrase “start the interview” for you to start. Questions can include both new questions and follow up questions from the previous questions. Continue the process until I ask you to stop.  And, you will stop the interview when I tell you to stop using the phrase “stop the interview”. After that, you would provide me feedback and rate my communication skills and technical skills out of 10 marks in a format such as communication skills/10 and technical skills/10"
		let { msg, sessionID, userID,systemMsg } = req.body;
		console.log(sessionID, userID);

		if(!systemMsg){
			systemMsg = systemPromptMsg
		}
		if (sessionID) {
			const data: ISession | null = await SessionModel.findOne({
				sessionID,
			});

			if (data) {
				const messages = data.messages.map(({ role, content }) => ({
					role,
					content,
				}));

				messages.push({ role: "user", content: msg });

				const chatcompletion = await openai.createChatCompletion({
					model: "gpt-3.5-turbo",
					messages: messages,
				});

				if (chatcompletion) {
					const completionText =
						chatcompletion.data.choices[0]?.message?.content ?? "";

					data.messages.push({ role: "user", content: msg });
					data.messages.push({
						role: "assistant",
						content: completionText,
					});

					await SessionModel.findByIdAndUpdate(data._id, {
						messages: data.messages,
					});

					res.send({ success: true, reply: completionText });
				}
			}
		} else {
			const sessionID = Math.floor(1000 + Math.random() * 9000);

			const chatcompletion = await openai.createChatCompletion({
				model: "gpt-3.5-turbo",
				messages: [{ role: "system", content: systemMsg },{ role: "user", content: msg }],
			});

			const completionText =
				chatcompletion.data.choices[0]?.message?.content ?? "";

			let first = [];

			first.push({ role: "user", content: msg });
			first.push({
				role: "assistant",
				content: completionText,
			});

			const data: ISession = new SessionModel({
				sessionID,
				userID,
				messages: first,
			});

			await data.save();

			res.send({ success: true, reply: completionText, sessionID });
		}
	} catch (error) {
		console.error("Error processing chat:", error);
		res.status(500).json({
			success: false,
			message: "Failed to process chat",
		});
	}
});

// get messages by bySessionID
sessionRouter.get(
	"/bySessionID/:sessionID",
	async (req: Request, res: Response) => {
		try {
			const sessionID = req.params.sessionID;
			const data: ISession | null = await SessionModel.findOne({
				sessionID,
			});
			res.send({ success: true, sessions: data });
		} catch (error) {
			console.error("Error processing chat:", error);
			res.status(500).json({
				success: false,
				message: "Failed to process chat",
			});
		}
	}
);

// get messages by byUserID
sessionRouter.get(
	"/byUserID/:userID",
	async (req: Request, res: Response) => {
		try {
			const userID = req.params.userID;
			const data: ISession[] | null = await SessionModel.find({
				userID,
			});
			res.send({ success: true, sessions: data });
		} catch (error) {
			console.error("Error processing chat:", error);
			res.status(500).json({
				success: false,
				message: "Failed to process chat",
			});
		}
	}
);


export default sessionRouter;
