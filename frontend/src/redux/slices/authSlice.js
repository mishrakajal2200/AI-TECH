import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TOKEN_KEY = "ai_tech_debt_token";
const USER_KEY = "ai_tech_debt_user";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});

export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/register", payload);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await api.get("/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data || res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const storedUser = localStorage.getItem(USER_KEY);

const initialState = {
  user: storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null,
  token: localStorage.getItem(TOKEN_KEY) || null,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    },
    setAuth(state, action) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(registerUser.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload.user;
        s.token = a.payload.token;
        localStorage.setItem(TOKEN_KEY, a.payload.token);
        localStorage.setItem(USER_KEY, JSON.stringify(a.payload.user));
      })
      .addCase(registerUser.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
      .addCase(loginUser.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(loginUser.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload.user;
        s.token = a.payload.token;
        localStorage.setItem(TOKEN_KEY, a.payload.token);
        localStorage.setItem(USER_KEY, JSON.stringify(a.payload.user));
      })
      .addCase(loginUser.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
      .addCase(fetchProfile.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchProfile.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload;
        localStorage.setItem(USER_KEY, JSON.stringify(a.payload));
      })
      .addCase(fetchProfile.rejected, (s, a) => { s.loading = false; s.error = a.payload; });
  },
});

export const { logout, setAuth } = slice.actions;
export default slice.reducer;
export const selectAuthUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
