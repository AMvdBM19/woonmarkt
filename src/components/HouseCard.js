import React from "react";
import { useNavigate } from "react-router-dom";
import "./HouseCard.css";

function HouseCard({ house }) {
  const navigate = useNavigate();

  return (
    <div className="house-card" onClick={() => navigate(`/house/${house._id}`)}>
      <img
        src={house.image ? `/uploads/${house.image}` : "https://images.unsplash.com/photo-1568605114967-8130f3a36994"}
        alt={house.title}
        className="house-card-img"
      />

      <div className="house-card-content">
        <h3>{house.title}</h3>
        <p className="house-card-location">{house.location}</p>

        <p className="house-card-price">
          &euro;{house.price} / {house.type}
        </p>

        <button
          className="house-card-btn"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/house/${house._id}`);
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default HouseCard;
