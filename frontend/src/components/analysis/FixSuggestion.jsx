import React from "react";
import { FiCheckCircle } from "react-icons/fi";

export default function FixSuggestion({ suggestion }) {
  return (
    <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg">
      <div className="flex items-center gap-3">
        <FiCheckCircle className="text-green-400" size={22} />
        <h4 className="font-semibold text-white">{suggestion.title}</h4>
      </div>

      <p className="text-gray-300 mt-2 text-sm">{suggestion.details}</p>

      <div className="text-gray-400 text-xs mt-3">
        Estimated Complexity: {suggestion.complexity}
      </div>
    </div>
  );
}
