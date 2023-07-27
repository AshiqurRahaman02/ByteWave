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
const feedback_model_1 = __importDefault(require("../models/feedback.model"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const feedbackRouter = express_1.default.Router();
// Post route to handle the creation of feedback
feedbackRouter.post("/add/feedback", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { question, answer, feedback, userID, skill, SME, CS, HC, } = req.body;
        const newFeedback = new feedback_model_1.default({
            question,
            answer,
            feedback,
            userID,
            skill,
            SME,
            CS,
            HC,
        });
        yield newFeedback.save();
        res.status(201).json({
            success: true,
            message: "Feedback posted successfully",
        });
    }
    catch (error) {
        console.error("Error posting feedback:", error);
        res.status(500).json({
            success: false,
            message: "Failed to post feedback",
        });
    }
}));
// GET route to get all feedbacks of one user using userID
feedbackRouter.get("/getFeedbacks/:userID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const feedbacks = yield feedback_model_1.default.find({ userID });
        if (feedbacks.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No feedbacks found for the user",
            });
        }
        res.status(200).json({ success: true, feedbacks });
    }
    catch (error) {
        console.error("Error fetching feedbacks:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch feedbacks",
        });
    }
}));
// Get route to get one feedback using feedbackID
feedbackRouter.get("/get/:feedbackID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { feedbackID } = req.params;
        const feedback = yield feedback_model_1.default.findById(feedbackID);
        if (!feedback) {
            return res
                .status(404)
                .json({ success: false, message: "Feedback not found" });
        }
        res.status(200).json({ success: true, feedback });
    }
    catch (error) {
        console.error("Error fetching feedback:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch feedback",
        });
    }
}));
// PUT route to update feedback using feedbackID
feedbackRouter.put("/update/:feedbackID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { feedbackID } = req.params;
        const { answer, feedback, SME, CS, HC } = req.body;
        let feedbackToUpdate = yield feedback_model_1.default.findById(feedbackID);
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
        feedbackToUpdate = yield feedbackToUpdate.save();
        res.status(200).json({ success: true, feedback: feedbackToUpdate });
    }
    catch (error) {
        console.error("Error updating feedback:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update feedback",
        });
    }
}));
// DELETE route to delete feedback using feedbackID
feedbackRouter.delete("/delete/:feedbackID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { feedbackID } = req.params;
        const deletedFeedback = yield feedback_model_1.default.findByIdAndDelete(feedbackID);
        if (!deletedFeedback) {
            return res
                .status(404)
                .json({ success: false, message: "Feedback not found" });
        }
        res.status(200).json({
            success: true,
            message: "Feedback deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting feedback:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete feedback",
        });
    }
}));
exports.default = feedbackRouter;
