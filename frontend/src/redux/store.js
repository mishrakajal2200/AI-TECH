import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import uploadReducer from "./slices/uploadSlice";
import analysisReducer from "./slices/analysisSlice";
import chatReducer from "./slices/chatSlice";
import uiReducer from "./slices/uiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    upload: uploadReducer,
    analysis: analysisReducer,
    chat: chatReducer,
    ui: uiReducer,
  },
  // optional: add middleware settings here
  devTools: import.meta.env.DEV,
});

export default store;
