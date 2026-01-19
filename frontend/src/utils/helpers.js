// src/utils/helpers.js

// Check if a value is empty (null, undefined, empty string)
export const isEmpty = (value) => {
  return (
    value === null ||
    value === undefined ||
    value === "" ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "object" &&
      !Array.isArray(value) &&
      Object.keys(value).length === 0)
  );
};

// Validate email format
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Debounce → waits before executing (useful for search)
export const debounce = (func, delay = 500) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

// Generate random ID for messages, uploads, etc.
export const generateId = () =>
  Math.random().toString(36).substring(2) + Date.now().toString(36);

// Capitalize first letter → "hello world" → "Hello world"
export const capitalize = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};
