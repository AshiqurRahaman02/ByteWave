import express, { Request, Response } from "express";
import UserModel, { IUser } from "../models/user.model";
import dotenv from "dotenv";

dotenv.config();

const userRouter = express.Router();

// Get user
userRouter.get("/get/:id", async (req: Request, res: Response) => {
	const userId = req.params.id;

	try {
		const user = await UserModel.findById(userId);

		if (!user) {
			return res
				.status(404)
				.json({ isError: true, message: "User not found" });
		}

		res.status(200).json({ isError: false, user });
	} catch (error) {
		res.status(500).json({ isError: true, message: error });
	}
});

// Register route
userRouter.post("/register", async (req: Request, res: Response) => {
	const { email, name } = req.body;
	try {
		let user: IUser | null = await UserModel.findOne({ email });
		if (user) {
			return res.status(404).json({
				isError: false,
				message: "Welcome back to the application",
				user,
			});
		}
		const newUser = new UserModel({ email, name });
		console.log(newUser);
		await newUser.save();
		res.status(201).json({
			isError: false,
			message: "Welcome to the application",
			newUser,
		});
	} catch (error: any) {
		res.status(404).json({ isError: true, message: error.message });
	}
});

// Delete route
userRouter.delete("/delete/:id", async (req: Request, res: Response) => {
	try {
		const userId = req.params.id;

		await UserModel.findByIdAndDelete(userId);

		res.status(200).json({
			isError: false,
			message: "User deleted successfully",
		});
	} catch (error: any) {
		res.status(500).json({ isError: true, message: error.message });
	}
});

export default userRouter;
