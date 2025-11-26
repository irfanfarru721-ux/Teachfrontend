import React, { useEffect, useState, useContext } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../../api/api.js";
import { AuthContext } from "../../context/AuthContext.jsx";

export default function Products() {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({ name: "", price: 0, categoryId: "", vendorId: "" });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts({ headers: { Authorization: `Bearer ${token}` } });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreate = async () => {
    try {
      await createProduct(newProduct, { headers: { Authorization: `Bearer ${token}` } });
      setNewProduct({ name: "", price: 0, categoryId: "", vendorId: "" });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id, { headers: { Authorization: `Bearer ${token}` } });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Products</h2>

      <div style={{ marginBottom: "20px" }}>
        <h3>Create New Product</h3>
        <input
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: parseInt(e.target.value) })}
        />
        <input
          placeholder="Category ID"
          value={newProduct.categoryId}
          onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
        />
        <input
          placeholder="Vendor ID"
          value={newProduct.vendorId}
          onChange={(e) => setNewProduct({ ...newProduct, vendorId: e.target.value })}
        />
        <button onClick={handleCreate} style={{ marginLeft: "10px" }}>Create</button>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category ID</th>
              <th>Vendor ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.categoryId}</td>
                <td>{p.vendorId}</td>
                <td>
                  <button onClick={() => handleDelete(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
