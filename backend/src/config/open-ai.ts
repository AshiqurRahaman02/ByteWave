import { Configuration, OpenAIApi } from "openai";
require("dotenv").config();

const configuration = new Configuration({
    apiKey: process.env.api_key
})

const openai = new OpenAIApi(configuration);

export default openai;