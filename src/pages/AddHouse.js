import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createHouse, improveDescription, isLoggedIn } from "../api";
import "./AddHouse.css";

function AddHouse() {
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    type: "sale",
    description: "",
    bedrooms: "",
    bathrooms: "",
    sqm: "",
    yearBuilt: "",
  });
  const [amenities, setAmenities] = useState([]);
  const [amenityInput, setAmenityInput] = useState("");
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

  const addAmenity = () => {
    if (amenityInput.trim() && !amenities.includes(amenityInput.trim())) {
      setAmenities([...amenities, amenityInput.trim()]);
      setAmenityInput("");
    }
  };

  const removeAmenity = (index) => {
    setAmenities(amenities.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.location || !form.price || !form.description) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const house = {
        ...form,
        price: Number(form.price),
        amenities: JSON.stringify(amenities),
      };
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
      <div className="form-card">
        <h1>List a Property</h1>
        <p className="form-subtitle">Add a new luxury property to our collection</p>

        {error && <p className="form-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Property title" value={form.title} onChange={handleChange} required />
          <input name="location" placeholder="Full address" value={form.location} onChange={handleChange} required />

          <div className="form-row">
            <input name="price" placeholder="Price (€)" type="number" value={form.price} onChange={handleChange} required />
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
              <option value="exchange">Exchange</option>
            </select>
          </div>

          <div className="form-row">
            <input name="bedrooms" placeholder="Bedrooms" type="number" value={form.bedrooms} onChange={handleChange} />
            <input name="bathrooms" placeholder="Bathrooms" type="number" value={form.bathrooms} onChange={handleChange} />
          </div>

          <div className="form-row">
            <input name="sqm" placeholder="Area (m²)" type="number" value={form.sqm} onChange={handleChange} />
            <input name="yearBuilt" placeholder="Year built" type="number" value={form.yearBuilt} onChange={handleChange} />
          </div>

          <div className="image-upload">
            <label className="image-label">
              {preview ? "Change Image" : "Upload Property Image"}
              <input type="file" accept="image/*" onChange={handleImage} hidden />
            </label>
            {preview && <img src={preview} alt="Preview" className="image-preview" />}
          </div>

          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <input
                placeholder="Add amenity (e.g. Swimming Pool)"
                value={amenityInput}
                onChange={(e) => setAmenityInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addAmenity(); } }}
                style={{ flex: 1 }}
              />
              <button type="button" onClick={addAmenity} className="ai-btn" style={{ flex: 'none', padding: '12px 16px' }}>+</button>
            </div>
            {amenities.length > 0 && (
              <div className="amenities-input">
                {amenities.map((a, i) => (
                  <span key={i} className="amenity-tag">
                    {a}
                    <button type="button" onClick={() => removeAmenity(i)}>&times;</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <textarea
            name="description"
            placeholder="Property description - highlight unique features, finishes, and lifestyle"
            value={form.description}
            onChange={handleChange}
            required
          />

          <div className="buttons">
            <button type="button" className="ai-btn" onClick={handleImprove} disabled={aiLoading}>
              {aiLoading ? "Improving..." : "AI Enhance"}
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Publishing..." : "Publish Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddHouse;
