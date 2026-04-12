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
        });
        if (data.image) {
          setPreview(`/uploads/${data.image}`);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setFetching(false));
  }, [id, navigate]);

  if (fetching) {
    return <div className="page"><div className="card"><p>Loading...</p></div></div>;
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
