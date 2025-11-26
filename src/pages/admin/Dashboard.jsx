import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient.js";

export default function Dashboard() {
  const [stats, setStats] = useState({ users: 0, orders: 0, products: 0 });

  useEffect(() => {
    apiClient.get("/admin/dashboard")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        <li>Total Users: {stats.users}</li>
        <li>Total Orders: {stats.orders}</li>
        <li>Total Products: {stats.products}</li>
      </ul>
    </div>
  );
}
