import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getHouses, isLoggedIn, clearAuth, getUser } from "../api";
import "./Home.css";

function Home() {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const loggedIn = isLoggedIn();
  const user = getUser();

  const fetchHouses = (params = {}) => {
    setLoading(true);
    const query = {};
    if (params.location) query.location = params.location;
    if (params.type) query.type = params.type;

    getHouses(query)
      .then((data) => setHouses(data))
      .catch(() => setHouses([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  const handleSearch = () => {
    fetchHouses({ location: city, type });
  };

  const handleLogout = () => {
    clearAuth();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="home">

      <nav className="nav">
        <h2><Link to="/" style={{ color: "inherit", textDecoration: "none" }}>WoonMarkt</Link></h2>
        <div className="nav-links">
          {loggedIn && <span>Hi, {user?.name}</span>}
          {loggedIn && <Link to="/add" style={{ color: "white" }}>Add Listing</Link>}
          {loggedIn ? (
            <span onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</span>
          ) : (
            <>
              <Link to="/login" style={{ color: "white" }}>Login</Link>
              <Link to="/register" style={{ color: "white" }}>Register</Link>
            </>
          )}
        </div>
      </nav>

      <section className="hero">
        <div className="glow"></div>

        <h1>Find Your Dream Home</h1>
        <p>Rent - Buy - Exchange with AI</p>

        <div className="search">
          <input
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All Types</option>
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
            <option value="exchange">Exchange</option>
          </select>
          <button onClick={handleSearch}>Search</button>
        </div>
      </section>

      <section className="section">
        <h2>Listings {houses.length > 0 && `(${houses.length})`}</h2>

        {loading && <p>Loading...</p>}

        {!loading && houses.length === 0 && (
          <p>No houses found. {loggedIn ? <Link to="/add" style={{ color: "#8b5cf6" }}>Add the first one!</Link> : "Log in to add a listing."}</p>
        )}

        <div className="grid">
          {houses.map((house) => (
            <div className="card" key={house._id} onClick={() => navigate(`/house/${house._id}`)} style={{ cursor: "pointer" }}>
              <div className="img"></div>

              <div className="content">
                <h3>{house.title}</h3>
                <p>{house.location}</p>
                <p className="price">{house.price} ({house.type})</p>
                <button onClick={(e) => { e.stopPropagation(); navigate(`/house/${house._id}`); }}>View</button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;
