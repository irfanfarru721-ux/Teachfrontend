import React from "react";
import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>🎉 Order Placed Successfully!</h1>
      <p>Your food will be delivered soon.</p>

      <Link to="/">
        <button style={{ marginTop: "20px", padding: "10px 20px" }}>
          Go to Home
        </button>
      </Link>
    </div>
  );
}
