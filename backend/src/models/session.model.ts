import mongoose, { Schema, Document } from "mongoose";

interface IMessage {
	role: "assistant" | "function" | "system" | "user";
	content: string;
}

export interface ISession extends Document {
	sessionID: string;
	messages: IMessage[];
	userID: string;
}

const sessionSchema: Schema = new Schema(
	{
		sessionID: {
			type: String,
			required: true,
			unique: true,
		},
		messages: {
			type: [
				{
					role: {
						type: String,
						required: true,
					},
					content: {
						type: String,
						required: true,
					},
				},
			],
			default: [],
		},
		userID: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const SessionModel = mongoose.model<ISession>("Session", sessionSchema);

export default SessionModel;
