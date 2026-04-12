import { useEffect, useState } from "react";
import { getHouses } from "../api";
import HouseCard from "../components/HouseCard";
import "./Home.css";

function Listings() {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getHouses()
      .then((data) => setHouses(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home">
      <section className="section" style={{ marginTop: "40px" }}>
        <h2>All Listings ({houses.length})</h2>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "#ef4444" }}>{error}</p>}
        {!loading && !error && houses.length === 0 && <p>No houses found.</p>}

        <div className="grid">
          {houses.map((house) => (
            <HouseCard key={house._id} house={house} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Listings;
