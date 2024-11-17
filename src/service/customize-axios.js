import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8888/lib",
});

// // Add a response interceptor

export default api;
