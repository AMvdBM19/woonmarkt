import { useEffect, useState } from "react";
import { getHouses } from "../services/api";
import HouseCard from "../components/HouseCard";

function Listings() {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    getHouses().then(setHouses);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Houses</h1>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px"
      }}>
        {houses.map((house) => (
          <HouseCard key={house._id} house={house} />
        ))}
      </div>
    </div>
  );
}

export default Listings;