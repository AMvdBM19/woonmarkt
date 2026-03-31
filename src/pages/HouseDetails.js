import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./HouseDetails.css";

function HouseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="details-page">
      <button className="btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="details-container">
        <div className="details-image"></div>

        <div className="details-info">
          <h1>Modern Apartment</h1>
          <p className="location"> Amsterdam</p>
          <p className="price">€1200 / month</p>

          <p className="description">
            This beautiful modern apartment offers spacious rooms, natural
            lighting, and a peaceful environment. Perfect for comfortable city
            living.
          </p>

          <div className="details-buttons">
            <button className="btn">Contact Owner</button>
            <button className="btn btn-secondary">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HouseDetails;