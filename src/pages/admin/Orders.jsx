import { useState, useEffect } from "react";
import api from "../../api/apiClient.js";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/api/orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <>
      <h1>All Orders</h1>
      {orders.map((o) => (
        <p key={o._id}>Order #{o._id}</p>
      ))}
    </>
  );
}
