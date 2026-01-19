import { GoogleGenerativeAI } from "@google/generative-ai";
import env from "../config/env.js";

const genAI = new GoogleGenerativeAI(env.OPENAI_API_KEY);

export default genAI;
