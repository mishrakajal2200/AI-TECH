import mongoose from "mongoose";

const fixSchema = new mongoose.Schema(
  {
    issue: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    suggestion: {
      type: String,
      required: true,
    },

    explanation: {
      type: String,
    },

    status: {
      type: String,
      enum: ["generated", "applied"],
      default: "generated",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Fix", fixSchema);
