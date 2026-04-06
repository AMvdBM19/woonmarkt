import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHouse, updateHouse, improveDescription, isLoggedIn } from "../api";
import "./AddHouse.css";

function EditHouse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    type: "rent",
    description: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    getHouse(id)
      .then((data) => {
        setForm({
          title: data.title,
          location: data.location,
          price: data.price,
          type: data.type,
          description: data.description,
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setFetching(false));
  }, [id]);

  if (!isLoggedIn()) {
    return (
      <div className="page">
        <div className="card">
          <h1>Edit House</h1>
          <p style={{ color: "#ef4444" }}>You must be logged in.</p>
          <button className="submit-btn" onClick={() => navigate("/login")}>Go to Login</button>
        </div>
      </div>
    );
  }

  if (fetching) {
    return <div className="page"><div className="card"><p>Loading...</p></div></div>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const house = { ...form, price: Number(form.price) };
      await updateHouse(id, house);
      navigate(`/house/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImprove = async () => {
    if (!form.description.trim()) {
      setError("Write a description first.");
      return;
    }
    setError("");
    setAiLoading(true);

    try {
      const data = await improveDescription(form.description);
      setForm({ ...form, description: data.improvedDescription });
    } catch (err) {
      setError("AI improvement failed: " + err.message);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1>Edit House</h1>

        {error && <p style={{ color: "#ef4444" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
          <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
          <input name="price" placeholder="Price" type="number" value={form.price} onChange={handleChange} required />

          <select name="type" value={form.type} onChange={handleChange}>
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
            <option value="exchange">Exchange</option>
          </select>

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <div className="buttons">
            <button type="button" className="ai-btn" onClick={handleImprove} disabled={aiLoading}>
              {aiLoading ? "Improving..." : "Improve"}
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>

        <button
          style={{ marginTop: "10px", background: "transparent", color: "#c4b5fd", border: "none", cursor: "pointer" }}
          onClick={() => navigate(`/house/${id}`)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditHouse;
