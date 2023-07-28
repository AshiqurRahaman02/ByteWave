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
const session_model_1 = __importDefault(require("../models/session.model"));
const open_ai_1 = __importDefault(require("../config/open-ai"));
const sessionRouter = express_1.default.Router();
sessionRouter.post("/chat", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    try {
        const { msg, sessionID, userID } = req.body;
        console.log(sessionID, userID);
        if (sessionID) {
            const data = yield session_model_1.default.findOne({
                sessionID,
            });
            if (data) {
                const messages = data.messages.map(({ role, content }) => ({
                    role,
                    content,
                }));
                messages.push({ role: "user", content: msg });
                const chatcompletion = yield open_ai_1.default.createChatCompletion({
                    model: "gpt-3.5-turbo",
                    messages: messages,
                });
                if (chatcompletion) {
                    const completionText = (_c = (_b = (_a = chatcompletion.data.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) !== null && _c !== void 0 ? _c : "";
                    data.messages.push({ role: "user", content: msg });
                    data.messages.push({
                        role: "assistant",
                        content: completionText,
                    });
                    yield session_model_1.default.findByIdAndUpdate(data._id, {
                        messages: data.messages,
                    });
                    res.send({ success: true, reply: completionText });
                }
            }
        }
        else {
            const sessionID = Math.floor(1000 + Math.random() * 9000);
            const chatcompletion = yield open_ai_1.default.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: msg }],
            });
            const completionText = (_f = (_e = (_d = chatcompletion.data.choices[0]) === null || _d === void 0 ? void 0 : _d.message) === null || _e === void 0 ? void 0 : _e.content) !== null && _f !== void 0 ? _f : "";
            let first = [];
            first.push({ role: "user", content: msg });
            first.push({
                role: "assistant",
                content: completionText,
            });
            const data = new session_model_1.default({
                sessionID,
                userID,
                messages: first,
            });
            yield data.save();
            res.send({ success: true, reply: completionText, sessionID });
        }
    }
    catch (error) {
        console.error("Error processing chat:", error);
        res.status(500).json({
            success: false,
            message: "Failed to process chat",
        });
    }
}));
exports.default = sessionRouter;
