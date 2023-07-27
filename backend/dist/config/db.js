"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const mongoURL = process.env.MONGO_URL;
const connection = mongoose_1.default.connect(mongoURL);
mongoose_1.default.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose_1.default.connection.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});
exports.default = connection;
