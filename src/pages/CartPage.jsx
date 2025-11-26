import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const updateQuantity = (index, qty) => {
    const newCart = [...cart];
    newCart[index].quantity = qty;
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item, idx) => (
            <div key={idx} style={{ borderBottom: "1px solid #ccc", marginBottom: "10px", paddingBottom: "10px" }}>
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(idx, parseInt(e.target.value))}
                style={{ width: "60px", marginRight: "10px" }}
              />
              <button onClick={() => removeItem(idx)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${total}</h3>
          <button onClick={() => navigate("/checkout")} style={{ padding: "10px", marginTop: "10px" }}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
