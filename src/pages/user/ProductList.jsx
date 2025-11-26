import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../api/apiClient.js";

export default function ProductList() {
  const { vendorId, categoryId, subCategoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    apiClient.get(`/products?vendor=${vendorId}&category=${categoryId}&subcategory=${subCategoryId}`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, [vendorId, categoryId, subCategoryId]);

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map(p => (
          <li key={p._id}>
            {p.name} - ₹{p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
