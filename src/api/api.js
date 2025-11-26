import axios from "axios";

export const API = axios.create({
  baseURL: "https://srudentbackend-1.onrender.com/api",
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

export const getRestaurants = () => API.get("/vendors");
export const getCategories = (restaurantId) =>
  API.get(`/categories?vendorId=${restaurantId}`);

export const getProducts = (categoryId) =>
  API.get(`/products?categoryId=${categoryId}`);

export const getProduct = (id) => API.get(`/products/${id}`);
