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
  const [fetching, setFetching] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    getHouse(id)
      .then((data) => {
        setForm({
          title: data.title,
          location: data.location,
          price: data.price,
          type: data.type,
          description: data.description,
          bedrooms: data.bedrooms || "",
          bathrooms: data.bathrooms || "",
          sqm: data.sqm || "",
          yearBuilt: data.yearBuilt || "",
        });
        if (data.amenities) setAmenities(data.amenities);
        if (data.images && data.images.length > 0) {
          setPreview(data.images[0]);
        } else if (data.image) {
          setPreview(data.image.startsWith('http') ? data.image : `/uploads/${data.image}`);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setFetching(false));
  }, [id, navigate]);

  if (fetching) {
    return <div className="page"><div className="form-card"><p style={{ color: 'var(--text-muted)' }}>Loading...</p></div></div>;
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
      await updateHouse(id, house, image);
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
      <div className="form-card">
        <h1>Edit Property</h1>
        <p className="form-subtitle">Update your property listing details</p>

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
            placeholder="Property description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <div className="buttons">
            <button type="button" className="ai-btn" onClick={handleImprove} disabled={aiLoading}>
              {aiLoading ? "Improving..." : "AI Enhance"}
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>

        <button
          style={{ marginTop: "16px", background: "transparent", color: "var(--text-muted)", border: "none", cursor: "pointer", fontSize: "14px" }}
          onClick={() => navigate(`/house/${id}`)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditHouse;
