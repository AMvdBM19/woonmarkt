import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, getUser, clearAuth } from "../api";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const user = getUser();

  const handleLogout = () => {
    clearAuth();
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Woon<span>markt</span>
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/listings">Collection</Link>

        {loggedIn ? (
          <>
            <Link to="/add">List Property</Link>
            <span className="navbar-user">{user?.name}</span>
            <span className="navbar-logout" onClick={handleLogout}>Logout</span>
          </>
        ) : (
          <>
            <Link to="/login">Sign In</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
