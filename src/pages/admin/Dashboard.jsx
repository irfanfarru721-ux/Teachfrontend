import React, { useEffect, useState, useContext } from "react";
import { getProducts, getVendors, getOrders } from "../../api/api.js";
import { AuthContext } from "../../context/AuthContext.jsx";

export default function Dashboard() {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, venRes, ordRes] = await Promise.all([
          getProducts({ headers: { Authorization: `Bearer ${token}` } }),
          getVendors({ headers: { Authorization: `Bearer ${token}` } }),
          getOrders({ headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setProducts(prodRes.data);
        setVendors(venRes.data);
        setOrders(ordRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading dashboard...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
          <h3>Total Products</h3>
          <p>{products.length}</p>
        </div>
        <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
          <h3>Total Vendors</h3>
          <p>{vendors.length}</p>
        </div>
        <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
          <h3>Total Orders</h3>
          <p>{orders.length}</p>
        </div>
      </div>
    </div>
  );
}
