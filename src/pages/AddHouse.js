import React, { useState } from "react";
import "./AddHouse.css";

function AddHouse() {
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    type: "rent",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="page">
      <div className="card">
        <h1>Add New House</h1>

        <input name="title" placeholder="Title" onChange={handleChange} />
        <input name="location" placeholder="Location" onChange={handleChange} />
        <input name="price" placeholder="Price" onChange={handleChange} />

        <select name="type" onChange={handleChange}>
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
          <option value="exchange">Exchange</option>
        </select>

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <div className="buttons">
          <button className="ai-btn">✨ Improve</button>
          <button className="submit-btn">Add House</button>
        </div>
      </div>
    </div>
  );
}

export default AddHouse;