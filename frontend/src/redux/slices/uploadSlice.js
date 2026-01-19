
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export const uploadZip = createAsyncThunk(
  "upload/uploadZip",
  async ({ file }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token; // get token from Redux
      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data; // backend returns {success, statusCode, message, data}
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    loading: false,
    progress: 0,
    status: "idle",
    result: null,
    error: null,
  },
  reducers: {
    resetUpload(state) {
      state.loading = false;
      state.progress = 0;
      state.result = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadZip.pending, (state) => {
  state.loading = true;
  state.status = "uploading";
})
.addCase(uploadZip.fulfilled, (state, action) => {
  state.loading = false;
  state.status = "done";
  state.result = action.payload;
})
.addCase(uploadZip.rejected, (state, action) => {
  state.loading = false;
  state.status = "error";
  state.error = action.payload;
});

  },
});

export const { resetUpload } = uploadSlice.actions;
export default uploadSlice.reducer;
export const selectUpload = (state) => state.upload;
