import React from "react";

function HouseCard({ house }) {
  return (
    <div style={styles.card}>
      <img
        src="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
        alt="house"
        style={styles.image}
      />

      <div style={styles.content}>
        <h3>{house.title}</h3>
        <p style={styles.location}>{house.location}</p>

        <p style={styles.swap}>
          <strong>Swap for:</strong> {house.swap}
        </p>

        <button style={styles.button}>View Details</button>
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
  swap: {
    marginTop: "10px",
    fontSize: "14px",
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