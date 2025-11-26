import React, { useEffect, useState, useContext } from "react";
import { getCategories } from "../api/api.js";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate, useParams } from "react-router-dom";

export default function Restaurants() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams(); // restaurant/vendor ID
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return navigate("/login");

    const fetchCategories = async () => {
      try {
        const res = await getCategories(id);
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [user, id]);

  if (!user) return null;
  if (loading) return <p style={{ textAlign: "center" }}>Loading categories...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Categories</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {categories.map((c) => (
          <div
            key={c._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              width: "200px",
              cursor: "pointer"
            }}
            onClick={() => navigate(`/products/${c._id}`)}
          >
            <h3>{c.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
