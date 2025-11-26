import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiClient from "../../api/apiClient.js";

export default function CategoryList() {
  const { vendorId } = useParams();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    apiClient.get(`/categories?vendor=${vendorId}`)
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, [vendorId]);

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map(c => (
          <li key={c._id}>
            <Link to={`/subcategories/${vendorId}/${c._id}`}>{c.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
