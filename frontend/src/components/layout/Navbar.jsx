import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  
  const {isAuthenticated,logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () =>{
    logout();
    navigate("/login");
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/60 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg flex justify-center items-center">
            <span className="text-white font-extrabold">AI</span>
          </div>
          <span className="text-lg font-bold text-white tracking-wide">
            Tech-Debt
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-gray-300">
          <Link to="/upload" className="hover:text-white">Upload</Link>
          <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
          <Link to="/chat" className="hover:text-white">Chat</Link>

          {isAuthenticated()?(
            <button onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white shadow"
            >
              Logout
            </button>
          ):(
            <Link 
            to="/login"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow"
            >
             Login
            </Link>
          )}
        </nav>

        {/* Mobile Button */}
        <button
          className="md:hidden text-gray-200"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-gray-900/95 border-t border-white/5">
          <div className="flex flex-col p-5 gap-3 text-gray-200">
            <Link to="/upload" onClick={() => setOpen(false)}>Upload</Link>
            <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
            <Link to="/chat" onClick={() => setOpen(false)}>Chat</Link>
            {isAuthenticated()?(
            <button onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white shadow"
            >
              Logout
            </button>
          ):(
            <Link 
            to="/login"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow"
            >
             Login
            </Link>
          )}
          </div>
        </div>
      )}
    </header>
  );
}
