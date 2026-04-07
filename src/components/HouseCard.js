import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function HouseCard({ house }) {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        ...(hover ? styles.cardHover : {}),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => navigate(`/house/${house._id}`)}
    >
      <img
        src="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
        alt="house"
        style={styles.image}
      />

      <div style={styles.content}>
        <h3>{house.title}</h3>
        <p style={styles.location}>{house.location}</p>

        <p style={styles.price}>
          €{house.price} / {house.type}
        </p>

        <button
          style={styles.button}
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

const styles = {
  card: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    overflow: "hidden",
    width: "260px",
    color: "white",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    transition: "0.3s",
    cursor: "pointer",
  },

  cardHover: {
    transform: "scale(1.05) translateY(-5px)",
  },

  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
  },

  content: {
    padding: "15px",
  },

  location: {
    color: "#c4b5fd",
    fontSize: "14px",
  },

  price: {
    marginTop: "10px",
    fontWeight: "bold",
  },

  button: {
    marginTop: "15px",
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    background: "#8b5cf6",
    color: "white",
    cursor: "pointer",
  },
};

export default HouseCard;