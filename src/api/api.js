// src/api/api.js
import axios from "axios";

// --------------------
// BASE API
// --------------------
export const API = axios.create({
  baseURL: "https://srudentbackend-1.onrender.com/api",
  // withCredentials: true, // enable if using cookies
});

// --------------------
// AUTH TOKEN HANDLER
// --------------------
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

// --------------------
// CENTRALIZED REQUEST HANDLER
// --------------------
const handleRequest = async (request) => {
  try {
    const res = await request();
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || err.message || "Something went wrong";
    throw new Error(message);
  }
};

// --------------------
// AUTH
// --------------------
export const loginUser = (data) => handleRequest(() => API.post("/auth/login", data));
export const registerUser = (data) => handleRequest(() => API.post("/auth/register", data));

// --------------------
// PRODUCTS
// --------------------
export const getProducts = () => handleRequest(() => API.get("/products"));
export const getProduct = (id) => handleRequest(() => API.get(`/products/${id}`));
export const createProduct = (data) => handleRequest(() => API.post("/products", data));
export const updateProduct = (id, data) => handleRequest(() => API.put(`/products/${id}`, data));
export const deleteProduct = (id) => handleRequest(() => API.delete(`/products/${id}`));

// --------------------
// ORDERS
// --------------------
export const createOrder = (data) => handleRequest(() => API.post("/orders", data));
export const getOrders = () => handleRequest(() => API.get("/orders"));

// --------------------
// VENDORS
// --------------------
export const getVendors = () => handleRequest(() => API.get("/vendors"));
export const getVendor = (id) => handleRequest(() => API.get(`/vendors/${id}`));
export const createVendor = (data) => handleRequest(() => API.post("/vendors", data));
export const updateVendor = (id, data) => handleRequest(() => API.put(`/vendors/${id}`, data));
export const deleteVendor = (id) => handleRequest(() => API.delete(`/vendors/${id}`));
