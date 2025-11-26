import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../api/api";

export default function Checkout() {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const [address, setAddress] = useState("");

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const placeOrder = async () => {
    try {
      const orderData = {
        items: cart,
        address,
        total
      };

      await createOrder(orderData);

      localStorage.removeItem("cart");
      navigate("/order-success");
    } catch (err) {
      console.log(err);
      alert("Failed to place order");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Checkout</h1>

      <h2>Total Amount: ₹{total}</h2>

      <textarea
        placeholder="Delivery Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ width: "100%", height: "120px", marginTop: "20px" }}
      />

      <button
        onClick={placeOrder}
        style={{ padding: "10px 20px", marginTop: "20px" }}
      >
        Place Order
      </button>
    </div>
  );
}
