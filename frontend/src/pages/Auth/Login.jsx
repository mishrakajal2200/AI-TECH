
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import InputField from "../../components/ui/InputField";
// import Button from "../../components/ui/Button";
// import { Eye, EyeOff } from "lucide-react";
// import { loginUser } from "../../services/authAPI";

// export default function Login() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);

//   // ✅ SINGLE CHANGE HANDLER
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // ✅ SUBMIT HANDLER
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await loginUser(formData);
//       navigate("/upload"); // or dashboard
//     } catch (error) {
//       alert(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-8">
//       <div className="w-full max-w-md bg-white/10 p-8 rounded-2xl border border-white/20 shadow-xl">

//         <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

//         <form className="space-y-4" onSubmit={handleSubmit}>
          
//           {/* Email */}
//           <InputField
//             label="Email"
//             name="email"
//             type="email"
//             placeholder="Enter your email"
//             value={formData.email}
//             onChange={handleChange}
//           />

//           {/* Password */}
//           <div className="relative">
//             <InputField
//               label="Password"
//               name="password"
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleChange}
//             />

//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute top-9 right-4 text-gray-300 hover:text-white"
//             >
//               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>

//           {/* Submit */}
//           <Button className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700">
//             Login
//           </Button>
//         </form>

//         {/* Register redirect */}
//         <p className="text-center text-gray-400 mt-6 text-sm">
//           Don't have an account?{" "}
//           <Link
//             to="/register"
//             className="text-indigo-400 hover:text-indigo-300 underline"
//           >
//             Register
//           </Link>
//         </p>

//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import { Eye, EyeOff } from "lucide-react";
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(formData); // 🔥 WAIT for Redux

    if (result?.meta?.requestStatus === "fulfilled") {
      navigate("/upload"); // ✅ ALWAYS WORKS
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-white/10 p-8 rounded-2xl border border-white/20 shadow-xl">

        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>

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
              placeholder="Enter your password"
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

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <Button
            disabled={loading}
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-400 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
