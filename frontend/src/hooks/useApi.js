// src/hooks/useApi.js
import { useState, useCallback } from "react";

const useApi = (apiFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...params) => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiFunction(...params);
        return response;
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  return { execute, loading, error };
};

export default useApi;
