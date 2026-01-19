import openai from "../config/openai.js";
import { EXPLANATION_PROMPT } from "./promptTemplates.js";

export const explainFix = async ({ issue, fix }) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: EXPLANATION_PROMPT },
      {
        role: "user",
        content: `
Issue:
${issue.description}

Fix:
${fix}
`,
      },
    ],
  });

  return response.choices[0].message.content;
};
