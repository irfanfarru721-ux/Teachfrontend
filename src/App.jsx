import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.jsx";

// USER pages
import Home from "./pages/user/Home.jsx";
import Products from "./pages/user/Products.jsx";
import ProductDetails from "./pages/user/ProductDetails.jsx";
import Cart from "./pages/user/Cart.jsx";
import Checkout from "./pages/user/Checkout.jsx";
import UserLogin from "./pages/user/UserLogin.jsx";
import UserSignup from "./pages/user/UserSignup.jsx";

// ADMIN pages
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminProducts from "./pages/admin/AdminProducts.jsx";
import AdminVendors from "./pages/admin/AdminVendors.jsx";
import AdminOrders from "./pages/admin/AdminOrders.jsx";

// LAYOUTS
import AdminLayout from "./components/admin/AdminLayout.jsx";
import UserLayout from "./components/user/UserLayout.jsx";

// PROTECTED ROUTES
import AdminProtectedRoute from "./routes/AdminProtectedRoute.jsx";
import UserProtectedRoute from "./routes/UserProtectedRoute.jsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ====================== USER ROUTES ====================== */}
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignup />} />

          <Route
            path="/"
            element={
              <UserLayout>
                <Home />
              </UserLayout>
            }
          />

          <Route
            path="/products"
            element={
              <UserLayout>
                <Products />
              </UserLayout>
            }
          />

          <Route
            path="/product/:id"
            element={
              <UserLayout>
                <ProductDetails />
              </UserLayout>
            }
          />

          <Route
            path="/cart"
            element={
              <UserProtectedRoute>
                <UserLayout>
                  <Cart />
                </UserLayout>
              </UserProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element{
              <UserProtectedRoute>
                <UserLayout>
                  <Checkout />
                </UserLayout>
              </UserProtectedRoute>
            }
          />

          {/* ====================== ADMIN ROUTES ====================== */}

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <AdminProducts />
                </AdminLayout>
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/vendors"
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <AdminVendors />
                </AdminLayout>
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <AdminOrders />
                </AdminLayout>
              </AdminProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
