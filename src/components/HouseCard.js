import React from "react";
import { useNavigate } from "react-router-dom";
import "./HouseCard.css";

const fallbackImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800";

function formatPrice(price, type) {
  if (price >= 1000000) {
    return `€${(price / 1000000).toFixed(1)}M`;
  }
  return `€${price.toLocaleString('nl-NL')}`;
}

function HouseCard({ house }) {
  const navigate = useNavigate();

  const imageSrc = house.images && house.images.length > 0
    ? house.images[0]
    : house.image
      ? (house.image.startsWith('http') ? house.image : `/uploads/${house.image}`)
      : fallbackImage;

  return (
    <div className="house-card" onClick={() => navigate(`/house/${house._id}`)}>
      <div className="house-card-img-wrapper">
        <img
          src={imageSrc}
          alt={house.title}
          className="house-card-img"
        />
        <span className="house-card-badge">
          For {house.type}
        </span>
        {house.featured && (
          <span className="house-card-featured">Featured</span>
        )}
      </div>

      <div className="house-card-content">
        <h3>{house.title}</h3>
        <p className="house-card-location">{house.location}</p>

        {(house.bedrooms > 0 || house.bathrooms > 0 || house.sqm > 0) && (
          <div className="house-card-details">
            {house.bedrooms > 0 && (
              <div className="house-card-detail">
                <span>{house.bedrooms}</span> Beds
              </div>
            )}
            {house.bathrooms > 0 && (
              <div className="house-card-detail">
                <span>{house.bathrooms}</span> Baths
              </div>
            )}
            {house.sqm > 0 && (
              <div className="house-card-detail">
                <span>{house.sqm}</span> m²
              </div>
            )}
          </div>
        )}

        <div className="house-card-footer">
          <div>
            <p className="house-card-price">{formatPrice(house.price, house.type)}</p>
            {house.type === 'rent' && (
              <span className="house-card-price-label">per month</span>
            )}
          </div>
          <button
            className="house-card-btn"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/house/${house._id}`);
            }}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}

export default HouseCard;
