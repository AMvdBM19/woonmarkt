import React from "react";

function Navbar() {
  return (
    <div style={styles.nav}>
      <h2 style={styles.logo}>Home Swap Finder</h2>

      <div style={styles.links}>
        <span>Browse Listings</span>
        <span>AI Match</span>
        <button style={styles.button}>Log In</button>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    color: "white",
  },
  logo: {
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    gap: "25px",
    alignItems: "center",
  },
  button: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#8b5cf6",
    color: "white",
    cursor: "pointer",
  },
};

export default Navbar;