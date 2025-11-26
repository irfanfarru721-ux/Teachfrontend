import React, { useEffect, useState, useContext } from "react";
import { getOrders, updateOrder } from "../../api/api.js";
import { AuthContext } from "../../context/AuthContext.jsx";

export default function Orders() {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await getOrders({ headers: { Authorization: `Bearer ${token}` } });
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrder(id, { status }, { headers: { Authorization: `Bearer ${token}` } });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Orders</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Products</th>
            <th>Total</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user?.name}</td>
              <td>
                {order.products?.map((p) => (
                  <div key={p.productId}>{p.productName} x {p.quantity}</div>
                ))}
              </td>
              <td>{order.total}</td>
              <td>{order.status || "Pending"}</td>
              <td>
                <select
                  value={order.status || "Pending"}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
