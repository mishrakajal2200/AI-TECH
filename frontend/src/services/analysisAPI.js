import api from "./api";

// Start Analysis
export const startAnalysis = async (projectId) => {
  const res = await api.post(`/analysis/start`, { projectId });
  return res.data;
};

// Fetch Summary
export const getAnalysisSummary = async (projectId) => {
  const res = await api.get(`/analysis/summary/${projectId}`);
  return res.data;
};

// Fetch Detected Issues
export const getIssues = async (projectId) => {
  const res = await api.get(`/analysis/issues/${projectId}`);
  return res.data;
};

// Generate Auto Fix for an Issue
export const generateFix = async (issueId) => {
  const res = await api.post(`/analysis/fix`, { issueId });
  return res.data;
};
