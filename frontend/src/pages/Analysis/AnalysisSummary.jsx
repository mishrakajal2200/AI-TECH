import React from "react";

export default function AnalysisSummary() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-4">Summary of Tech Debt</h1>

      <div className="bg-white/5 border border-white/10 p-8 rounded-xl">
        <p className="text-gray-300">
          This summary highlights detected issues like long functions, code smells,
          duplicated code, unused variables, and architectural inconsistencies.
        </p>
      </div>
    </div>
  );
}
