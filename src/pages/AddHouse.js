import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createHouse, improveDescription, isLoggedIn } from "../api";
import "./AddHouse.css";

function AddHouse() {
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    type: "rent",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const navigate = useNavigate();

  if (!isLoggedIn()) {
    navigate("/login");
    return null;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.location || !form.price || !form.description) {
      setError("Please fill in all fields");
      return;
    }

    if (Number(form.price) <= 0) {
      setError("Price must be greater than 0");
      return;
    }

    setLoading(true);

    try {
      const house = { ...form, price: Number(form.price) };
      const data = await createHouse(house, image);
      navigate(`/house/${data._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImprove = async () => {
    if (!form.description.trim()) {
      setError("Write a description first, then improve it with AI.");
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
        <h1>Add New House</h1>

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

          <div className="image-upload">
            <label className="image-label">
              {preview ? "Change Image" : "Upload Image"}
              <input type="file" accept="image/*" onChange={handleImage} hidden />
            </label>
            {preview && <img src={preview} alt="Preview" className="image-preview" />}
          </div>

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
              {loading ? "Adding..." : "Add House"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddHouse;
