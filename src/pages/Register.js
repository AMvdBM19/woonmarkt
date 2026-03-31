import React, { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={styles.page}>
      <h1>Register</h1>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} style={styles.input} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={styles.input} />
      <input placeholder="Password" onChange={(e) => setPassword(e.target.value)} style={styles.input} />

      <button style={styles.button}>Register</button>
    </div>
  );
}

const styles = {
  page: {
    background: "#1e1b4b",
    color: "white",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    width: "250px",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    background: "#8b5cf6",
    color: "white",
  },
};

export default Register;