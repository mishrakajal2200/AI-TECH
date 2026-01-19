import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div
      className={`p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}
