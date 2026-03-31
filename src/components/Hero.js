import React from "react";

function Hero() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Swap Homes & Save Money</h1>

      <p style={styles.subtitle}>
        Trade your home with others and save on housing costs using AI-powered matching.
      </p>

      <div style={styles.searchBox}>
        <select style={styles.input}>
          <option>Any City</option>
        </select>

        <select style={styles.input}>
          <option>Home Type</option>
        </select>

        <select style={styles.input}>
          <option>Swap For</option>
        </select>

        <button style={styles.button}>Search</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "80px 20px",
    color: "white",
  },
  title: {
    fontSize: "42px",
    marginBottom: "20px",
  },
  subtitle: {
    color: "#d1d5db",
    marginBottom: "30px",
  },
  searchBox: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    background: "#8b5cf6",
    color: "white",
    cursor: "pointer",
  },
};

export default Hero;