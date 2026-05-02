import axios from "axios";

const isLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  (isLocal ? "http://localhost:8080" : "https://taskmanager-mjp3.onrender.com");

const API = axios.create({
  baseURL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
