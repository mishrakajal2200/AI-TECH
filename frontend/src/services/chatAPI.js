import api from "./api";

export const sendMessageAPI = async (message, projectId) => {
  const res = await api.post("/chat/message", {
    message,
    projectId,
  });
  return res.data;
};

export const getChatHistoryAPI = async (projectId) => {
  const res = await api.get(`/chat/history/${projectId}`);
  return res.data;
};
