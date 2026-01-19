import React from "react";

export default function Footer() {
  return (
    <footer className="text-center py-6 text-gray-400 border-t border-white/10 bg-gray-900/50 backdrop-blur-xl">
      <p>© {new Date().getFullYear()} AI Tech-Debt Eliminator. All rights reserved.</p>
    </footer>
  );
}
