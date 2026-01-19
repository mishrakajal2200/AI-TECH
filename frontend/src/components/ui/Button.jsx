import React from "react";

export default function Button({ children, onClick, variant = "primary", className = "" }) {
  const base =
    "px-5 py-2.5 rounded-lg font-semibold transition shadow-md active:scale-95";

  const styles = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    outline: "border border-white/20 text-gray-200 hover:bg-white/10",
  };

  return (
    <button onClick={onClick} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
}
