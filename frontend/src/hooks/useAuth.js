// src/hooks/useAuth.js
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser, logout } from "../redux/slices/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();

  const { user, token, loading, error } = useSelector((state) => state.auth);

  const isAuthenticated = () => !!token;

  const isAdmin = () => user?.role === "admin";

  const register = (data) => dispatch(registerUser(data));
  const login = (data) => dispatch(loginUser(data));
  const performLogout = () => dispatch(logout());

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    register,
    login,
    logout: performLogout,
    isAdmin
  };
};

export default useAuth;
