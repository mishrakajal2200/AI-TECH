import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["uploaded", "analyzing", "completed"],
      default: "uploaded",
    },

    language: {
      type: String,
      default: "javascript",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
