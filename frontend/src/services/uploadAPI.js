import api from "./api";

// ZIP Upload
export const uploadZipAPI = async (file, onProgress) => {
  const form = new FormData();
  form.append("file", file);

  const res = await api.post("/upload/zip", form, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (progressEvent) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgress(percent);
    },
  });

  return res.data;
};

// GitHub Upload
export const uploadGithubAPI = async (repoUrl) => {
  const res = await api.post("/upload/github", { repoUrl });
  return res.data;
};
