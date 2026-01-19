import openai from "../config/openai.js";
import { AUTO_FIX_PROMPT } from "./promptTemplates.js";

export const generateAutoFix = async ({ issue, code }) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: AUTO_FIX_PROMPT },
      {
        role: "user",
        content: `
Issue:
${issue.description}

Original Code:
${code}
`,
      },
    ],
  });

  return response.choices[0].message.content;
};
