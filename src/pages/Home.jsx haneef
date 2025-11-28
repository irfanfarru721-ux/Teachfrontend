import React, {useEffect, useState} from "react";
import { getModules, getAllProducts } from "../api/api";
import { Link } from "react-router-dom";

export default function Home(){
  const [modules,setModules]=useState([]);
  const [products,setProducts]=useState([]);
  useEffect(()=> {
    (async()=> {
      try{
        const m = await getModules();
        setModules(m.data || []);
        const p = await getAllProducts();
        setProducts(p.data || []);
      }catch(e){ console.error(e) }
    })();
  },[]);
  return (
    <div className="container">
      <h1>Welcome to SmartShop</h1>
      <h2>Categories</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:12}}>
        {modules.map(mod=> <Link key={mod._id} to={`/modules/${mod._id}/vendors`} className="card"><h3>{mod.name}</h3></Link>)}
      </div>
      <h2 style={{marginTop:20}}>Latest Products</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:12}}>
        {products.slice(0,8).map(p=> <Link key={p._id} to={`/product/${p._id}`} className="card"><h4>{p.name}</h4><p>₹{p.price}</p></Link>)}
      </div>
    </div>
  );
}
