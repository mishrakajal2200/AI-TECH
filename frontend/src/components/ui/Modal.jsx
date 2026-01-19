import React from "react";
import { FiX } from "react-icons/fi";

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[100]">
      <div className="w-full max-w-lg p-6 rounded-2xl bg-gray-900 border border-white/10 shadow-xl animate-slide-down">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            <FiX size={22} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
