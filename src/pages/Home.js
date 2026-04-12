import React, { useEffect, useState } from "react";
import { getHouses, aiSearch } from "../api";
import HouseCard from "../components/HouseCard";
import "./Home.css";

function Home() {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [aiQuery, setAiQuery] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiFilters, setAiFilters] = useState(null);

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
    setAiFilters(null);
    fetchHouses({ location: city, type });
  };

  const handleAiSearch = async () => {
    if (!aiQuery.trim()) return;
    setAiLoading(true);
    setAiFilters(null);

    try {
      const data = await aiSearch(aiQuery);
      setHouses(data.houses);
      setAiFilters(data.filters);
    } catch (err) {
      setHouses([]);
    } finally {
      setAiLoading(false);
    }
  };

  const clearAiSearch = () => {
    setAiQuery("");
    setAiFilters(null);
    fetchHouses();
  };

  return (
    <div className="home">
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

        <div className="ai-search">
          <p className="ai-search-label">Or search with AI</p>
          <div className="ai-search-box">
            <input
              placeholder='Try "affordable house in Rotterdam for rent"'
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAiSearch()}
            />
            <button onClick={handleAiSearch} disabled={aiLoading}>
              {aiLoading ? "Searching..." : "AI Search"}
            </button>
          </div>

          {aiFilters && (
            <div className="ai-filters">
              <span>AI found filters: </span>
              {aiFilters.location && <span className="ai-tag">{aiFilters.location}</span>}
              {aiFilters.type && <span className="ai-tag">{aiFilters.type}</span>}
              {aiFilters.minPrice && <span className="ai-tag">Min &euro;{aiFilters.minPrice}</span>}
              {aiFilters.maxPrice && <span className="ai-tag">Max &euro;{aiFilters.maxPrice}</span>}
              <button className="ai-clear" onClick={clearAiSearch}>Clear</button>
            </div>
          )}
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
