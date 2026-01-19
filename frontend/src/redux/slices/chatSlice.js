import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

export const sendChatMessage = createAsyncThunk(
  "chat/send",
  async ({ projectId, message }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await api.post(
        `/chat/${projectId}/send`,
        { message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data; // expect { messageId, from: 'ai'|'user', text, timestamp }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchChatHistory = createAsyncThunk(
  "chat/fetchHistory",
  async ({ projectId }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await api.get(`/chat/${projectId}/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data; // { messages: [] }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  messages: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addLocalMessage(state, action) {
      state.messages.push(action.payload);
    },
    clearChat(state) {
      state.messages = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendChatMessage.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(sendChatMessage.fulfilled, (s, a) => {
        s.loading = false;
        // push AI response or server echo
        if (a.payload?.message) s.messages.push(a.payload.message);
      })
      .addCase(sendChatMessage.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload || a.error.message;
      })

      .addCase(fetchChatHistory.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchChatHistory.fulfilled, (s, a) => {
        s.loading = false;
        s.messages = a.payload.messages || [];
      })
      .addCase(fetchChatHistory.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload || a.error.message;
      });
  },
});

export const { addLocalMessage, clearChat } = slice.actions;
export default slice.reducer;

// selectors
export const selectChat = (state) => state.chat;
