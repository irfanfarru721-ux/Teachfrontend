import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { getOrders } from "../api/api.js";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return navigate("/login");

    const fetchOrders = async () => {
      try {
        const res = await getOrders({ headers: { Authorization: `Bearer ${token}` } });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, token]);

  if (!user) return null;
  if (loading) return <p style={{ textAlign: "center" }}>Loading orders...</p>;

  if (!orders.length) return <p style={{ padding: "20px" }}>You have no orders yet.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Orders</h2>
      {orders.map((order) => (
        <div key={order._id} style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "10px", marginBottom: "10px" }}>
          <h3>Order ID: {order._id}</h3>
          <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
          <p>Status: {order.status || "Pending"}</p>
          <h4>Items:</h4>
          <ul>
            {order.items.map((item) => (
              <li key={item._id}>{item.name} x {item.quantity} - ${item.price}</li>
            ))}
          </ul>
          <p>Total: ${order.items.reduce((acc, i) => acc + i.price * i.quantity, 0)}</p>
        </div>
      ))}
    </div>
  );
}
