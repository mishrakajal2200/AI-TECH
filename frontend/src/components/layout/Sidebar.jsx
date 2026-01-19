import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiUpload, FiBarChart2, FiMessageSquare } from "react-icons/fi";

export default function Sidebar() {
  const links = [
    { to: "/dashboard", label: "Dashboard", icon: <FiHome /> },
    { to: "/upload", label: "Upload", icon: <FiUpload /> },
    { to: "/analysis", label: "Analysis", icon: <FiBarChart2 /> },
    { to: "/chat", label: "Chat AI", icon: <FiMessageSquare /> },
  ];

  return (
    <aside className="hidden md:block w-64 bg-gray-900 border-r border-white/10 min-h-screen pt-20 fixed left-0 top-0">
      <nav className="flex flex-col gap-2 px-4">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium 
              ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                  : "text-gray-300 hover:bg-white/5"
              }`
            }
          >
            {l.icon}
            {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
