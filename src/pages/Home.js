import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getHouses, isLoggedIn, clearAuth, getUser } from "../api";
import HouseCard from "../components/HouseCard";
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

    getHouses(params)
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
        <h2>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            WoonMarkt
          </Link>
        </h2>

        <div className="nav-links">
          {loggedIn && <span>Hi, {user?.name}</span>}
          {loggedIn && (
            <Link to="/add" style={{ color: "white" }}>
              Add Listing
            </Link>
          )}

          {loggedIn ? (
            <span onClick={handleLogout} style={{ cursor: "pointer" }}>
              Logout
            </span>
          ) : (
            <>
              <Link to="/login" style={{ color: "white" }}>
                Login
              </Link>
              <Link to="/register" style={{ color: "white" }}>
                Register
              </Link>
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
        <h2>Available Homes ({houses.length})</h2>

        {loading && <p>Loading homes...</p>}

        {!loading && houses.length === 0 && (
          <p>No houses found.</p>
        )}

        <div className="grid">
          {houses.map((house) => (
            <HouseCard key={house._id} house={house} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;