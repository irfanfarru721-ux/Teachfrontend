import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Auth
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";

// Admin
import Dashboard from "./pages/admin/Dashboard.jsx";
import Vendors from "./pages/admin/Vendors.jsx";
import Products from "./pages/admin/Products.jsx";
import Orders from "./pages/admin/Orders.jsx";

// User
import UserHome from "./pages/user/UserHome.jsx";
import VendorList from "./pages/user/VendorList.jsx";
import CategoryList from "./pages/user/CategoryList.jsx";
import SubCategoryList from "./pages/user/SubCategoryList.jsx";
import ProductList from "./pages/user/ProductList.jsx";
import Cart from "./pages/user/Cart.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Auth */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />

        {/* User Routes */}
        <Route path="/" element={<UserHome />} />
        <Route path="/vendors" element={<VendorList />} />
        <Route path="/categories/:vendorId" element={<CategoryList />} />
        <Route path="/subcategories/:catId" element={<SubCategoryList />} />
        <Route path="/products/:subCatId" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/vendors"
          element={
            <ProtectedRoute role="admin">
              <Vendors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute role="admin">
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute role="admin">
              <Orders />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
