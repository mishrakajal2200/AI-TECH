
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

/* Layout & helpers */
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import ProtectedRoute from "./components/layout/ProtectedRoute";

/* Pages */
import LandingPage from "./pages/Landing/LandingPage";
import UploadPage from "./pages/Upload/UploadPage";
import AnalysisDashboard from "./pages/Analysis/AnalysisDashboard";
import AnalysisSummary from "./pages/Analysis/AnalysisSummary";
import FixesPage from "./pages/Analysis/FixesPage";
import AIChatPage from "./pages/Chat/AIChatPage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import UserProfile from "./pages/Profile/UserProfile";
import AdminPanel from "./pages/Admin/AdminPanel"; // if exists

/* Auth hook */
import useAuth from "./hooks/useAuth";

export default function RoutesTree() {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <>
      {/* Top navigation shown everywhere */}
      <Navbar />

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-8">
          {/* Sidebar only for authenticated & on md+ screens */}
          {isAuthenticated() && (
            <aside className="hidden md:block">
              <Sidebar />
            </aside>
          )}

          {/* Main content area */}
          <main className={`flex-1 ${isAuthenticated() ? "md:ml-64" : ""}`}>
            <Routes>
              <Route path="/" element={<LandingPage />} />

              <Route
                path="/upload"
                element={
                  <ProtectedRoute isAllowed={isAuthenticated()}>
                    <UploadPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/analysis/:projectId/dashboard"
                element={
                  <ProtectedRoute isAllowed={isAuthenticated()}>
                    <AnalysisDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/analysis/:projectId/summary"
                element={
                  <ProtectedRoute isAllowed={isAuthenticated()}>
                    <AnalysisSummary />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/analysis/:projectId/fixes"
                element={
                  <ProtectedRoute isAllowed={isAuthenticated()}>
                    <FixesPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/chat"
                element={
                  <ProtectedRoute isAllowed={isAuthenticated()}>
                    <AIChatPage />
                  </ProtectedRoute>
                }
              />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute isAllowed={isAuthenticated()}>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin"
                element={
                  <ProtectedRoute isAllowed={isAdmin()}>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}
