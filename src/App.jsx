import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

// User pages
import UserHome from "./pages/user/UserHome.jsx";
import VendorList from "./pages/user/VendorList.jsx";
import CategoryList from "./pages/user/CategoryList.jsx";
import SubCategoryList from "./pages/user/SubCategoryList.jsx";
import ProductList from "./pages/user/ProductList.jsx";
import Cart from "./pages/user/Cart.jsx";

// Auth pages
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";

// Admin pages
import Dashboard from "./pages/admin/Dashboard.jsx";
import Vendors from "./pages/admin/Vendors.jsx";
import Products from "./pages/admin/Products.jsx";
import Orders from "./pages/admin/Orders.jsx";

// Layouts
import UserLayout from "./components/UserLayout.jsx";
import AdminLayout from "./components/AdminLayout.jsx";

// Protected Routes
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />

          {/* User Routes */}
          <Route path="/" element={<UserLayout><UserHome /></UserLayout>} />
          <Route path="/vendors" element={<UserLayout><VendorList /></UserLayout>} />
          <Route path="/categories/:vendorId" element={<UserLayout><CategoryList /></UserLayout>} />
          <Route path="/subcategories/:vendorId/:categoryId" element={<UserLayout><SubCategoryList /></UserLayout>} />
          <Route path="/products/:vendorId/:categoryId/:subCategoryId" element={<UserLayout><ProductList /></UserLayout>} />
          <Route path="/cart" element={<ProtectedRoute role="user"><UserLayout><Cart /></UserLayout></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminLayout><Dashboard /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/vendors" element={<ProtectedRoute role="admin"><AdminLayout><Vendors /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute role="admin"><AdminLayout><Products /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute role="admin"><AdminLayout><Orders /></AdminLayout></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
