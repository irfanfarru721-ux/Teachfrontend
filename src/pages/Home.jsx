import React, { useEffect, useState, useContext } from "react";
import { getRestaurants } from "../api/api.js";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return navigate("/login");

    const fetchRestaurants = async () => {
      try {
        const res = await getRestaurants();
        setRestaurants(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [user]);

  if (!user) return null; // Prevent flashing content
  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Restaurants / Vendors</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {restaurants.map((r) => (
          <div
            key={r._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              width: "200px",
              cursor: "pointer"
            }}
            onClick={() => navigate(`/restaurants/${r._id}`)}
          >
            <h3>{r.name}</h3>
            <p>{r.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
