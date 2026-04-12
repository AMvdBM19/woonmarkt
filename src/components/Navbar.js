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
      <h2>
        <Link to="/" className="navbar-logo">WoonMarkt</Link>
      </h2>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/listings">Listings</Link>

        {loggedIn && <Link to="/add">Add Listing</Link>}

        {loggedIn ? (
          <>
            <span className="navbar-user">Hi, {user?.name}</span>
            <span className="navbar-logout" onClick={handleLogout}>Logout</span>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
