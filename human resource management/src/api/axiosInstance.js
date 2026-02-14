import axios from "axios";
import { BASE_URL } from "./api";
import { toast } from "react-toastify";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//req intercepter
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

//res intercepter
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message || error.message || "Unknown error";

    // Handle Unauthorized
    if (status === 401) {
      localStorage.removeItem("token");
      toast.error("Session expired. Please login again.");
      window.location.href = "/login"; // safe outside React
    } else if (status >= 500)
      toast.error("Server error. Please try again later.");
    else if (error.code === "ECONNABORTED")
      toast.error("Request timeout. Check your internet connection.");
    else toast.error(message);

    return Promise.reject(error);
  },
);
