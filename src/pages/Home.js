import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHouses, aiSearch } from "../api";
import HouseCard from "../components/HouseCard";
import "./Home.css";

function Home() {
  const [houses, setHouses] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [aiQuery, setAiQuery] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiFilters, setAiFilters] = useState(null);

  const fetchHouses = (params = {}) => {
    setLoading(true);
    getHouses(params)
      .then((data) => {
        setHouses(data);
        setFeatured(data.filter(h => h.featured));
      })
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
      setFeatured([]);
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

  const displayHouses = aiFilters ? houses : (featured.length > 0 ? featured : houses.slice(0, 6));

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <span className="hero-label">Luxury Real Estate</span>
          <h1>Exceptional Properties for Discerning Buyers</h1>
          <p>
            Curated collection of the finest residences across the Netherlands and Europe.
            From historic canal houses to contemporary architectural masterpieces.
          </p>

          <div className="search-container">
            <div className="search">
              <input
                placeholder="City or location"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">All Types</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
                <option value="exchange">Exchange</option>
              </select>
              <button onClick={handleSearch}>Search</button>
            </div>

            <div className="ai-search">
              <p className="ai-search-label">Or describe what you're looking for</p>
              <div className="ai-search-box">
                <input
                  placeholder='e.g. "Modern penthouse with sea view in Rotterdam"'
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
                  <span>Filters applied: </span>
                  {aiFilters.location && <span className="ai-tag">{aiFilters.location}</span>}
                  {aiFilters.type && <span className="ai-tag">{aiFilters.type}</span>}
                  {aiFilters.minPrice && <span className="ai-tag">From €{aiFilters.minPrice.toLocaleString()}</span>}
                  {aiFilters.maxPrice && <span className="ai-tag">Up to €{aiFilters.maxPrice.toLocaleString()}</span>}
                  <button className="ai-clear" onClick={clearAiSearch}>Clear</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-number">{houses.length}+</span>
          <span className="stat-label">Properties</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">5</span>
          <span className="stat-label">Countries</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">€32M</span>
          <span className="stat-label">Highest Listing</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">24/7</span>
          <span className="stat-label">Concierge</span>
        </div>
      </div>

      <section className="section">
        <div className="section-header">
          <h2>{aiFilters ? "Search Results" : "Featured Properties"}</h2>
          <Link to="/listings">View All</Link>
        </div>

        {loading && <p className="loading-text">Loading properties...</p>}

        {!loading && displayHouses.length === 0 && (
          <p className="loading-text">No properties found matching your criteria.</p>
        )}

        <div className="grid">
          {displayHouses.map((house) => (
            <HouseCard key={house._id} house={house} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
