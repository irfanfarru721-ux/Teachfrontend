import { useEffect, useState } from "react";

export default function VendorList() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://YOUR_BACKEND_URL/api/vendors")
      .then((res) => res.json())
      .then((data) => {
        setVendors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading vendors...</p>;
  if (!vendors.length) return <p>No vendors found.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Vendors</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vendors.map((v) => (
          <div key={v._id} className="border p-4 rounded shadow hover:shadow-md">
            <h2 className="text-lg font-semibold">{v.name}</h2>
            <p>{v.email}</p>
            <p>{v.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
