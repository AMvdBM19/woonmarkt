import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register, setAuth } from "../api";
import "./Login.css";

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

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

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
    <div className="login-page">
      <div className="login-card">
        <h1>Register</h1>

        {error && <p style={{ color: "#ef4444" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            className="login-input"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="login-input"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="login-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="login-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p style={{ marginTop: "15px" }}>
          Already have an account? <Link to="/login" style={{ color: "#8b5cf6" }}>Login</Link>
        </p>
        <p><Link to="/" style={{ color: "#c4b5fd" }}>Back to Home</Link></p>
      </div>
    </div>
  );
}

export default Register;
