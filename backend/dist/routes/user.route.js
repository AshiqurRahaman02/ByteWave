"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_model_1 = __importDefault(require("../models/user.model"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userRouter = express_1.default.Router();
// Get user
userRouter.get("/get/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            return res
                .status(404)
                .json({ isError: true, message: "User not found" });
        }
        res.status(200).json({ isError: false, user });
    }
    catch (error) {
        res.status(500).json({ isError: true, message: error });
    }
}));
// Register route
userRouter.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name } = req.body;
    try {
        let user = yield user_model_1.default.findOne({ email });
        if (user) {
            return res.status(201).json({
                isError: false,
                message: "Welcome back to the application",
                user,
            });
        }
        const newUser = new user_model_1.default({ email, name });
        console.log(newUser);
        yield newUser.save();
        res.status(201).json({
            isError: false,
            message: "Welcome to the application",
            newUser,
        });
    }
    catch (error) {
        res.status(404).json({ isError: true, message: error.message });
    }
}));
// Delete route
userRouter.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        yield user_model_1.default.findByIdAndDelete(userId);
        res.status(200).json({
            isError: false,
            message: "User deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({ isError: true, message: error.message });
    }
}));
exports.default = userRouter;
