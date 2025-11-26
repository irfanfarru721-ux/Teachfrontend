import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiClient from "../../api/apiClient.js";

export default function SubCategoryList() {
  const { vendorId, categoryId } = useParams();
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    apiClient.get(`/subcategories?vendor=${vendorId}&category=${categoryId}`)
      .then(res => setSubcategories(res.data))
      .catch(err => console.error(err));
  }, [vendorId, categoryId]);

  return (
    <div>
      <h2>Subcategories</h2>
      <ul>
        {subcategories.map(sc => (
          <li key={sc._1d}>
            <Link to={`/products/${vendorId}/${categoryId}/${sc._id}`}>{sc.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
