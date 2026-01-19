import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus } from "lucide-react";

import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import useAuth from "../../hooks/useAuth";

export default function Register() {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/upload"); // 🔥 GUARANTEED
    }
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center p-8 text-white">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-2xl">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="p-4 bg-indigo-600/20 rounded-full">
              <UserPlus size={32} className="text-indigo-400" />
            </div>
          </div>

          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Create an Account
          </h2>
          <p className="text-gray-300 mt-2">
            Join AI Tech-Debt Eliminator and improve your code quality.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>

          <InputField
            label="Full Name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <div className="relative">
            <InputField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-9 right-4 text-gray-300"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="relative">
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute top-9 right-4 text-gray-300"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <Button
            disabled={loading}
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
