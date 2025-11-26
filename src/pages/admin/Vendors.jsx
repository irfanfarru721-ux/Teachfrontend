import React, { useEffect, useState, useContext } from "react";
import { getVendors, createVendor, updateVendor, deleteVendor } from "../../api/api.js";
import { AuthContext } from "../../context/AuthContext.jsx";

export default function Vendors() {
  const { token } = useContext(AuthContext);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newVendor, setNewVendor] = useState({ name: "", email: "" });

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const res = await getVendors({ headers: { Authorization: `Bearer ${token}` } });
      setVendors(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleCreate = async () => {
    try {
      await createVendor(newVendor, { headers: { Authorization: `Bearer ${token}` } });
      setNewVendor({ name: "", email: "" });
      fetchVendors();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteVendor(id, { headers: { Authorization: `Bearer ${token}` } });
      fetchVendors();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Vendors</h2>

      <div style={{ marginBottom: "20px" }}>
        <h3>Create New Vendor</h3>
        <input
          placeholder="Name"
          value={newVendor.name}
          onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={newVendor.email}
          onChange={(e) => setNewVendor({ ...newVendor, email: e.target.value })}
        />
        <button onClick={handleCreate} style={{ marginLeft: "10px" }}>Create</button>
      </div>

      {loading ? (
        <p>Loading vendors...</p>
      ) : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((v) => (
              <tr key={v._id}>
                <td>{v.name}</td>
                <td>{v.email}</td>
                <td>
                  <button onClick={() => handleDelete(v._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
