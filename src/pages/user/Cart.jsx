import { useCart } from "../../context/CartContext.jsx";

export default function Cart() {
  const { cart, removeItem } = useCart();

  return (
    <>
      <h1>Your Cart</h1>
      {cart.map((item) => (
        <div key={item._id}>
          <p>{item.name}</p>
          <button onClick={() => removeItem(item._id)}>Remove</button>
        </div>
      ))}
    </>
  );
}
