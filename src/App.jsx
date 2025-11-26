import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext.jsx";

// Pages
import Login from "./pages/Login.jsx"; // Single login page
import Signup from "./pages/UserSignup.jsx";

// User Pages
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminProducts from "./pages/admin/AdminProducts.jsx";
import AdminVendors from "./pages/admin/AdminVendors.jsx";
import AdminOrders from "./pages/admin/AdminOrders.jsx";

// Layouts
import AdminLayout from "./components/admin/AdminLayout.jsx";
import UserLayout from "./components/user/UserLayout.jsx";

// Protected Route
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ====================== LOGIN / SIGNUP ====================== */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ====================== USER ROUTES ====================== */}
          <Route
            path="/"
            element={
              <ProtectedRoute role="user">
                <UserLayout>
                  <Home />
                </UserLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute role="user">
                <UserLayout>
                  <Products />
                </UserLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute role="user">
                <UserLayout>
                  <ProductDetails />
                </UserLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute role="user">
                <UserLayout>
                  <Cart />
                </UserLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute role="user">
                <UserLayout>
                  <Checkout />
                </UserLayout>
              </ProtectedRoute>
            }
          />

          {/* ====================== ADMIN ROUTES ====================== */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout>
                  <AdminProducts />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/vendors"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout>
                  <AdminVendors />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout>
                  <AdminOrders />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* ====================== FALLBACK ====================== */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
