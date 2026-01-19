// src/utils/format.js

// Format date: "2025-01-12T12:30:00Z" → "12 Jan 2025"
export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// Convert file size to readable format
export const formatFileSize = (bytes) => {
  if (!bytes) return "0 KB";

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};

// Trim long text → "Hello world... "
export const truncateText = (text, limit = 50) => {
  if (!text) return "";
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};
