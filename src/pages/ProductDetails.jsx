import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold">Product Details: {id}</h1>
      <p>Details for this product will be shown here.</p>
    </div>
  );
}
