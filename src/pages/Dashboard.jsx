import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { getProducts, getVendors, getOrders } from "../api/api";

export default function Dashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const [productsData, vendorsData, ordersData] = await Promise.all([
          getProducts(),
          getVendors(),
          getOrders(),
        ]);
        setProducts(productsData);
        setVendors(vendorsData);
        setOrders(ordersData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (!user) return <p>Please login to view the dashboard.</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Products */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Products</h2>
        <ul className="list-disc pl-5">
          {products.map((p) => (
            <li key={p._id}>
              {p.name} - ${p.price}
            </li>
          ))}
        </ul>
      </section>

      {/* Vendors */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Vendors</h2>
        <ul className="list-disc pl-5">
          {vendors.map((v) => (
            <li key={v._id}>
              {v.name} - {v.email}
            </li>
          ))}
        </ul>
      </section>

      {/* Orders */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Orders</h2>
        <ul className="list-disc pl-5">
          {orders.map((o) => (
            <li key={o._id}>
              {o.customerName} - ${o.total} - {o.status}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
