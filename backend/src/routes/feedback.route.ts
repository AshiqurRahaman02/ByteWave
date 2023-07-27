import express, { Request, Response } from "express";
import FeedbackModel, { IFeedback } from "../models/feedback.model";
import dotenv from "dotenv";

dotenv.config();

const feedbackRouter = express.Router();

// Post route to handle the creation of feedback
feedbackRouter.post("/add/feedback", async (req: Request, res: Response) => {
	try {
		const {
			question,
			answer,
			feedback,
			userID,
			skill,
			SME,
			CS,
			HC,
		}: IFeedback = req.body;

		const newFeedback: IFeedback = new FeedbackModel({
			question,
			answer,
			feedback,
			userID,
			skill,
			SME,
			CS,
			HC,
		});

		await newFeedback.save();

		res.status(201).json({
			success: true,
			message: "Feedback posted successfully",
		});
	} catch (error) {
		console.error("Error posting feedback:", error);
		res.status(500).json({
			success: false,
			message: "Failed to post feedback",
		});
	}
});

// GET route to get all feedbacks of one user using userID
feedbackRouter.get(
	"/getFeedbacks/:userID",
	async (req: Request, res: Response) => {
		try {
			const { userID } = req.params;

			const feedbacks: IFeedback[] = await FeedbackModel.find({ userID });

			if (feedbacks.length === 0) {
				return res.status(404).json({
					success: false,
					message: "No feedbacks found for the user",
				});
			}

			res.status(200).json({ success: true, feedbacks });
		} catch (error) {
			console.error("Error fetching feedbacks:", error);
			res.status(500).json({
				success: false,
				message: "Failed to fetch feedbacks",
			});
		}
	}
);

// Get route to get one feedback using feedbackID
feedbackRouter.get("/get/:feedbackID", async (req: Request, res: Response) => {
	try {
		const { feedbackID } = req.params;

		const feedback: IFeedback | null = await FeedbackModel.findById(
			feedbackID
		);

		if (!feedback) {
			return res
				.status(404)
				.json({ success: false, message: "Feedback not found" });
		}

		res.status(200).json({ success: true, feedback });
	} catch (error) {
		console.error("Error fetching feedback:", error);
		res.status(500).json({
			success: false,
			message: "Failed to fetch feedback",
		});
	}
});

// PUT route to update feedback using feedbackID
feedbackRouter.put(
	"/update/:feedbackID",
	async (req: Request, res: Response) => {
		try {
			const { feedbackID } = req.params;
			const { answer, feedback, SME, CS, HC }: Partial<IFeedback> = req.body;

			let feedbackToUpdate: IFeedback | null = await FeedbackModel.findById(
				feedbackID
			);

			if (!feedbackToUpdate) {
				return res
					.status(404)
					.json({ success: false, message: "Feedback not found" });
			}

			if (answer) {
				feedbackToUpdate.answer = answer;
			}

			if (feedback) {
				feedbackToUpdate.feedback = feedback;
			}

			if (SME) {
				feedbackToUpdate.SME = SME;
			}

			if (CS) {
				feedbackToUpdate.CS = CS;
			}

			if (HC) {
				feedbackToUpdate.HC = HC;
			}

			feedbackToUpdate = await feedbackToUpdate.save();

			res.status(200).json({ success: true, feedback: feedbackToUpdate });
		} catch (error) {
			console.error("Error updating feedback:", error);
			res.status(500).json({
				success: false,
				message: "Failed to update feedback",
			});
		}
	}
);

// DELETE route to delete feedback using feedbackID
feedbackRouter.delete(
	"/delete/:feedbackID",
	async (req: Request, res: Response) => {
		try {
			const { feedbackID } = req.params;

			const deletedFeedback: IFeedback | null =
				await FeedbackModel.findByIdAndDelete(feedbackID);

			if (!deletedFeedback) {
				return res
					.status(404)
					.json({ success: false, message: "Feedback not found" });
			}

			res.status(200).json({
				success: true,
				message: "Feedback deleted successfully",
			});
		} catch (error) {
			console.error("Error deleting feedback:", error);
			res.status(500).json({
				success: false,
				message: "Failed to delete feedback",
			});
		}
	}
);

export default feedbackRouter;
