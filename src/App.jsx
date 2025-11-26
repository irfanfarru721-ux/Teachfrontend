import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

import Login from "./pages/auth/Login.jsx";

// User Pages
import UserHome from "./pages/user/UserHome.jsx";
import VendorList from "./pages/user/VendorList.jsx";
import ProductList from "./pages/user/ProductList.jsx";
import Cart from "./pages/user/Cart.jsx";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard.jsx";
import AdminProducts from "./pages/admin/Products.jsx";
import AdminVendors from "./pages/admin/Vendors.jsx";
import AdminOrders from "./pages/admin/Orders.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* USER ROUTES */}
          <Route path="/user/home" element={<ProtectedRoute role="user"><UserHome /></ProtectedRoute>} />
          <Route path="/user/vendors" element={<ProtectedRoute role="user"><VendorList /></ProtectedRoute>} />
          <Route path="/user/products" element={<ProtectedRoute role="user"><ProductList /></ProtectedRoute>} />
          <Route path="/user/cart" element={<ProtectedRoute role="user"><Cart /></ProtectedRoute>} />

          {/* ADMIN ROUTES */}
          <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute role="admin"><AdminProducts /></ProtectedRoute>} />
          <Route path="/admin/vendors" element={<ProtectedRoute role="admin"><AdminVendors /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute role="admin"><AdminOrders /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
