"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("openai");
require("dotenv").config();
const configuration = new openai_1.Configuration({
    apiKey: process.env.api_key
});
const openai = new openai_1.OpenAIApi(configuration);
exports.default = openai;
