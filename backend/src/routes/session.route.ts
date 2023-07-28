import express, { Request, Response } from "express";
import SessionModel, { ISession } from "../models/session.model";
import openai from "../config/open-ai";

const sessionRouter = express.Router();

sessionRouter.post("/chat", async (req: Request, res: Response) => {
	try {
		const { msg, sessionID, userID } = req.body;
		console.log(sessionID, userID);

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
				messages: [{ role: "user", content: msg }],
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


export default sessionRouter;
