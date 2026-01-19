// src/App.js
import React from "react";
import RoutesTree from "./routes";
import Footer from "./components/layout/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* RoutesTree renders header / pages */}
      <RoutesTree />

      {/* Footer shown on all pages */}
      <Footer />
    </div>
  );
}
