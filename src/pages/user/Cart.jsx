import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient.js";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    apiClient.get("/cart")
      .then(res => setCartItems(res.data))
      .catch(err => console.error(err));
  }, []);

  const removeItem = (id) => {
    apiClient.delete(`/cart/${id}`)
      .then(() => setCartItems(prev => prev.filter(item => item._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : (
        <ul>
          {cartItems.map(item => (
            <li key={item._id}>
              {item.product.name} - ₹{item.product.price}
              <button onClick={() => removeItem(item._id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
