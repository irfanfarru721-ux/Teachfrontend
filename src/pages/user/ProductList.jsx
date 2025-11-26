import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/apiClient.js";
import { useCart } from "../../context/CartContext.jsx";

export default function ProductList() {
  const { subCatId } = useParams();
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get(`/api/products/subcategory/${subCatId}`).then((res) => setProducts(res.data));
  }, []);

  return (
    <>
      <h1>Products</h1>
      {products.map((p) => (
        <div key={p._id} style={{ marginBottom: 10 }}>
          <p>{p.name}</p>
          <button onClick={() => addToCart(p)}>Add to Cart</button>
        </div>
      ))}
    </>
  );
}
