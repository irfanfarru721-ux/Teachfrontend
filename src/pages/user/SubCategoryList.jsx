import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/apiClient.js";

export default function SubCategoryList() {
  const { catId } = useParams();
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    api.get(`/api/subcategories/category/${catId}`).then((res) => setSubs(res.data));
  }, []);

  return (
    <>
      <h1>Subcategories</h1>
      {subs.map((s) => (
        <p key={s._id}>
          <Link to={`/products/${s._id}`}>{s.name}</Link>
        </p>
      ))}
    </>
  );
}
