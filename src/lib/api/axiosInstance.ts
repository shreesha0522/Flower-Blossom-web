import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const getTokenFromCookie = (): string | null => {
  if (typeof window === "undefined") return null;
  const match = document.cookie
    .split(";")
    .find((c) => c.trim().startsWith("auth_token="));
  if (!match) return null;
  return decodeURIComponent(match.trim().split("=").slice(1).join("="));
};

axiosInstance.interceptors.request.use((config) => {
  const token = getTokenFromCookie();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Unknown error";
    const url = error.config?.url;
    console.error("API Error:", { status, message, url });
    error.userMessage = message;
    return Promise.reject(error);
  }
);

export default axiosInstance;