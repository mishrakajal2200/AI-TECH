
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api.js"; // make sure this path is correct

// Start Analysis thunk
export const startAnalysis = createAsyncThunk(
  "analysis/start",
  async ({ projectId }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token; // using getState
      const res = await api.post(`/analysis/start/${projectId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Fetch Analysis by project
export const fetchAnalysisByProject = createAsyncThunk(
  "analysis/fetchByProject",
  async ({ projectId }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await api.get(`/analysis/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const analysisSlice = createSlice({
  name: "analysis",
  initialState: {
    loading: false,
    status: null,
    issues: [],
    error: null,
  },
  reducers: {
    clearAnalysis(state) {
      state.loading = false;
      state.status = null;
      state.issues = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startAnalysis.pending, (state) => {
        state.loading = true;
      })
      .addCase(startAnalysis.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.issues = action.payload.issues || [];
      })
      .addCase(startAnalysis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAnalysisByProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnalysisByProject.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.issues = action.payload.issues || [];
      })
      .addCase(fetchAnalysisByProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAnalysis } = analysisSlice.actions;
export default analysisSlice.reducer;
export const selectAnalysis = (state) => state.analysis;
