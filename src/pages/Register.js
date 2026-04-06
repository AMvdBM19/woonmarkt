import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register, setAuth } from "../api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await register(name, email, password);
      setAuth(data);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <h1>Register</h1>

      {error && <p style={{ color: "#ef4444" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} required />
        <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} required />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} required />

        <button style={styles.button} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p style={{ marginTop: "15px" }}>
        Already have an account? <Link to="/login" style={{ color: "#8b5cf6" }}>Login</Link>
      </p>
      <p><Link to="/" style={{ color: "#c4b5fd" }}>Back to Home</Link></p>
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
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    cursor: "pointer",
  },
};

export default Register;
