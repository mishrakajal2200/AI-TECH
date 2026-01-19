import genAI from "../config/gemini.js";
import ApiError from "../utils/ApiError.js";

export const chatWithCodebase = async ({ message }) => {
  if (!message) {
    throw new ApiError(400, "Message is required");
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });

    const result = await model.generateContent([
      { text: message }
    ]);

    return result.response.text();
  } catch (err) {
    console.error("Gemini Chat Error:", err);
    throw new ApiError(500, "AI service failed");
  }
};
