import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ VERY IMPORTANT
});

// Helper function to get token from cookie
const getTokenFromCookie = (): string | null => {
  if (typeof window === "undefined") return null;

  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const [name, ...rest] = cookie.trim().split("=");
    const value = rest.join("=");

    if (name === "auth_token") {
      return decodeURIComponent(value);
    }
  }

  return null;
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
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
