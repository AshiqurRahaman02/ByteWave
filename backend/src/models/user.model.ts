import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
    isBlocked: boolean;
}

const userSchema: Schema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
    isBlocked: { type: Boolean, default: false}
});

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
