import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

export default function IssueCard({ issue }) {
  if (!issue) return null; // prevent crash if issue is undefined

  return (
    <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg hover:bg-white/10 transition">
      <div className="flex items-center gap-3">
        <FiAlertTriangle className="text-yellow-400" size={22} />
        <h4 className="font-semibold text-white">{issue.title}</h4>
      </div>

      <p className="text-gray-300 mt-2 text-sm">{issue.description}</p>

      <span
        className={`inline-block mt-3 px-3 py-1 text-xs rounded-full 
        ${
          issue.severity === "high"
            ? "bg-red-600/30 text-red-300"
            : issue.severity === "medium"
            ? "bg-yellow-600/30 text-yellow-300"
            : "bg-green-600/30 text-green-300"
        }`}
      >
        {issue.severity?.toUpperCase() || "LOW"}
      </span>
    </div>
  );
}