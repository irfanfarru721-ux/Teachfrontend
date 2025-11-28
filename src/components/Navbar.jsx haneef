import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar(){
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart")||"[]");
  const count = cart.reduce((s,i)=> s + (i.quantity||1), 0);
  const isLogged = !!localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")||"{}");

  const logout = ()=> {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="nav">
      <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div><Link to="/" style={{fontWeight:700,color:'#fff',textDecoration:'none'}}>SmartShop</Link></div>
        <div>
          <Link to="/modules">Categories</Link>
          <Link to="/cart">Cart ({count})</Link>
          {isLogged ? (
            <>
              <span style={{marginLeft:12}}>{user.name||'Profile'}</span>
              <button style={{marginLeft:12}} onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
