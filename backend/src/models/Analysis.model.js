import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    issueType: String,
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
    },
    description: String,
    file: String,
    line: Number,
    code: String,
  },
  { _id: true }
);

const analysisSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["processing", "completed"],
      default: "processing",
    },

    issues: [issueSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Analysis", analysisSchema);
