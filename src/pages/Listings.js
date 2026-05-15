import { useEffect, useState } from "react";
import { getHouses } from "../api";
import HouseCard from "../components/HouseCard";
import "./Listings.css";

function Listings() {
  const [houses, setHouses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ type: "", city: "", minPrice: "", maxPrice: "" });

  useEffect(() => {
    getHouses()
      .then((data) => {
        setHouses(data);
        setFiltered(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = [...houses];
    if (filters.type) {
      result = result.filter(h => h.type === filters.type);
    }
    if (filters.city) {
      result = result.filter(h =>
        h.location.toLowerCase().includes(filters.city.toLowerCase()) ||
        (h.address?.city && h.address.city.toLowerCase().includes(filters.city.toLowerCase()))
      );
    }
    if (filters.minPrice) {
      result = result.filter(h => h.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter(h => h.price <= Number(filters.maxPrice));
    }
    setFiltered(result);
  }, [filters, houses]);

  const handleFilter = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="listings-page">
      <div className="listings-header">
        <h1>Our Collection</h1>
        <p>Browse our curated selection of exceptional properties</p>
      </div>

      <div className="listings-filters">
        <input
          name="city"
          placeholder="Filter by city"
          value={filters.city}
          onChange={handleFilter}
        />
        <select name="type" value={filters.type} onChange={handleFilter}>
          <option value="">All Types</option>
          <option value="sale">For Sale</option>
          <option value="rent">For Rent</option>
          <option value="exchange">Exchange</option>
        </select>
        <input
          name="minPrice"
          placeholder="Min price"
          type="number"
          value={filters.minPrice}
          onChange={handleFilter}
        />
        <input
          name="maxPrice"
          placeholder="Max price"
          type="number"
          value={filters.maxPrice}
          onChange={handleFilter}
        />
      </div>

      <div className="listings-count">
        {filtered.length} {filtered.length === 1 ? 'property' : 'properties'} found
      </div>

      {loading && <p className="listings-loading">Loading properties...</p>}
      {error && <p className="listings-error">{error}</p>}

      {!loading && !error && filtered.length === 0 && (
        <p className="listings-loading">No properties match your filters.</p>
      )}

      <div className="listings-grid">
        {filtered.map((house) => (
          <HouseCard key={house._id} house={house} />
        ))}
      </div>
    </div>
  );
}

export default Listings;
