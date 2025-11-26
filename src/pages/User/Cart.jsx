import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const c = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(c);
  }, []);

  const updateQty = (id, qty) => {
    const updated = cart.map((item) =>
      item._id === id ? { ...item, qty: Number(qty) } : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id} style={{ marginBottom: "20px" }}>
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>

              <input
                type="number"
                value={item.qty}
                min="1"
                onChange={(e) => updateQty(item._id, e.target.value)}
              />

              <button
                onClick={() => removeItem(item._id)}
                style={{ marginLeft: "10px" }}
              >
                Remove
              </button>
            </div>
          ))}

          <h2>Total: ₹{total}</h2>

          <button
            onClick={() => navigate("/checkout")}
            style={{ padding: "10px 20px", marginTop: "20px" }}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}
