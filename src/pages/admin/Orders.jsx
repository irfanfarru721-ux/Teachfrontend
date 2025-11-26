import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient.js";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    apiClient.get("/admin/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      {orders.length === 0 ? <p>No orders found.</p> : (
        <ul>
          {orders.map(order => (
            <li key={order._id}>
              Order #{order._id} - User: {order.user?.name || "N/A"} - Total: ₹{order.total}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
