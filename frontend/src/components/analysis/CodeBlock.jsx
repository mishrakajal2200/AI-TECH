import React from "react";
import { FiCopy } from "react-icons/fi";

export default function CodeBlock({ code }) {
  const copy = () => navigator.clipboard.writeText(code);

  return (
    <div className="bg-[#0d1117] text-gray-200 rounded-xl border border-white/10 p-4 font-mono text-sm relative">
      <button
        onClick={copy}
        className="absolute right-3 top-3 text-gray-400 hover:text-white"
      >
        <FiCopy size={19} />
      </button>

      <pre className="whitespace-pre-wrap">{code}</pre>
    </div>
  );
}
