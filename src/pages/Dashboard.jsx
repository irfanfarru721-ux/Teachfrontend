import React, { useEffect, useState } from "react";
import { getProducts, getVendors, getOrders } from "../api/api";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

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
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Products */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Products</h2>
        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td className="border px-2 py-1">{p._id}</td>
                <td className="border px-2 py-1">{p.name}</td>
                <td className="border px-2 py-1">${p.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Vendors */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Vendors</h2>
        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Email</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((v) => (
              <tr key={v._id}>
                <td className="border px-2 py-1">{v._id}</td>
                <td className="border px-2 py-1">{v.name}</td>
                <td className="border px-2 py-1">{v.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Orders */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Orders</h2>
        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Customer</th>
              <th className="border px-2 py-1">Total</th>
              <th className="border px-2 py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td className="border px-2 py-1">{o._id}</td>
                <td className="border px-2 py-1">{o.customerName}</td>
                <td className="border px-2 py-1">${o.total}</td>
                <td className="border px-2 py-1">{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
