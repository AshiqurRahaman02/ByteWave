import mongoose, { Document, Schema } from "mongoose";

interface SME {
	marks: string;
	content: string;
}

interface CS {
	marks: string;
	content: string;
}

interface HC {
	status: "Reject" | "Waitlist" | "Hire" | "Strong Hire";
	content: string;
}

export interface IFeedback extends Document {
	question: string;
	answer: string;
	feedback: string;
	userID: string;
	skill: string;
	SME: SME;
	CS: CS;
	HC: HC;
}

const feedbackSchema = new Schema<IFeedback>(
	{
		question: {
			type: String,
			required: true,
		},
		answer: {
			type: String,
			required: true,
		},
		feedback: {
			type: String,
			required: true,
		},
		userID: {
			type: String,
			required: true,
		},
		skill: {
			type: String,
			required: true,
		},
		SME: {
			type: {
				marks: {
					type: String,
                    enum: ["Reject", "Waitlist", "Hire", "Strong Hire"],
			        default: "Hire",
				},
				content: {
					type: String
				},
			},
			required: true,
		},
		CS: {
			type: {
				marks: {
					type: String,
					required: true,
				},
				content: {
					type: String,
					required: true,
				},
			},
			required: true,
		},
		HC: {
			type: {
				status: {
					type: String,
					required: true,
				},
				content: {
					type: String,
					required: true,
				},
			},
			required: true,
		},
	},
	{ timestamps: true }
);

const FeedbackModel = mongoose.model<IFeedback>("Feedback", feedbackSchema);

export default FeedbackModel;
