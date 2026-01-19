import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpen: true,
  modal: { open: false, content: null },
  theme: "dark", // 'dark' | 'light'
  toast: null,
};

const slice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    openModal(state, action) {
      state.modal = { open: true, content: action.payload || null };
    },
    closeModal(state) {
      state.modal = { open: false, content: null };
    },
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setToast(state, action) {
      state.toast = action.payload; // { type, message }
    },
    clearToast(state) {
      state.toast = null;
    },
  },
});

export const { toggleSidebar, openModal, closeModal, setTheme, setToast, clearToast } =
  slice.actions;
export default slice.reducer;

// selectors
export const selectUI = (state) => state.ui;
