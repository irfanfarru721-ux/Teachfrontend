import { useParams } from "react-router-dom";

export default function CategoryProducts() {
  const { name } = useParams();

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold">Category: {name}</h1>
      <p>Products in this category will be listed here.</p>
    </div>
  );
}

