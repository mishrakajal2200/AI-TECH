import Fix from "../models/Fix.model.js";
import Analysis from "../models/Analysis.model.js";
import openai from "../config/gemini.js";
import ApiError from "../utils/ApiError.js";

export const createFix = async (issueId, userId) => {
  const analysis = await Analysis.findOne({ "issues._id": issueId });
  if (!analysis) {
    throw new ApiError(404, "Issue not found");
  }

  const issue = analysis.issues.id(issueId);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are an expert engineer fixing technical debt in production code.",
      },
      {
        role: "user",
        content: `Fix this issue:\n${issue.description}\nCode:\n${issue.code}`,
      },
    ],
  });

  const fix = await Fix.create({
    issue: issueId,
    suggestion: completion.choices[0].message.content,
    status: "generated",
  });

  return fix;
};

export const applyFixToProject = async (fixId, userId) => {
  const fix = await Fix.findById(fixId);
  if (!fix) {
    throw new ApiError(404, "Fix not found");
  }

  // Future: Apply patch to filesystem
  fix.status = "applied";
  await fix.save();

  return fix;
};
