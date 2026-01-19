// import openai from "../config/openai.js";
// import { TECH_DEBT_DETECTION_PROMPT } from "./promptTemplates.js";

// export const detectTechDebt = async ({ code, filePath }) => {
//   const response = await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [
//       { role: "system", content: TECH_DEBT_DETECTION_PROMPT },
//       {
//         role: "user",
//         content: `File: ${filePath}\n\n${code}`,
//       },
//     ],
//   });

//   try {
//     return JSON.parse(response.choices[0].message.content);
//   } catch {
//     return [];
//   }
// };

import genAI from "../config/gemini.js";
import { TECH_DEBT_DETECTION_PROMPT } from "./promptTemplates.js";

export const detectTechDebt = async ({ code, filePath }) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
${TECH_DEBT_DETECTION_PROMPT}

File: ${filePath}
Code:
${code}

Respond ONLY in JSON array format.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    try {
      return JSON.parse(text);
    } catch {
      return [];
    }
  } catch (err) {
    console.error("Gemini Error:", err.message);
    return [];
  }
};
