import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/apiClient.js";

export default function CategoryList() {
  const { vendorId } = useParams();
  const [cats, setCats] = useState([]);

  useEffect(() => {
    api.get(`/api/categories/vendor/${vendorId}`).then((res) => setCats(res.data));
  }, []);

  return (
    <>
      <h1>Categories</h1>
      {cats.map((c) => (
        <p key={c._id}>
          <Link to={`/subcategories/${c._id}`}>{c.name}</Link>
        </p>
      ))}
    </>
  );
}
