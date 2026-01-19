import React from "react";

export default function LoadingSpinner({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-t-transparent border-indigo-500 rounded-full animate-spin"></div>
      <p className="text-gray-300 text-sm">{label}</p>
    </div>
  );
}
