import axios from "axios";

export const API = axios.create({
  baseURL: "https://srudentbackend-1.onrender.com/api", // <-- your backend URL
});

// Set auth token
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

// Auth
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);
