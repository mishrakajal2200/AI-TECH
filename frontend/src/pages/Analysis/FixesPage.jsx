import React from "react";
import FixSuggestion from "../../components/analysis/FixSuggestion";
import CodeBlock from "../../components/analysis/CodeBlock";

export default function FixesPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Fix Suggestions</h1>

      <FixSuggestion
        title="Refactor long authentication function"
        description="Split into smaller reusable functions for better readability."
      />

      <CodeBlock
        code={`function validateUser() {\n  // validation logic\n}`}
      />
    </div>
  );
}
