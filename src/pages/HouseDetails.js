import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHouse, deleteHouse, getUser, isLoggedIn } from "../api";
import "./HouseDetails.css";

function HouseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = getUser();

  useEffect(() => {
    getHouse(id)
      .then((data) => setHouse(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    try {
      await deleteHouse(id);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="details-page"><p>Loading...</p></div>;
  if (error) return <div className="details-page"><p style={{ color: "#ef4444" }}>{error}</p></div>;
  if (!house) return <div className="details-page"><p>House not found.</p></div>;

  const isOwner = isLoggedIn() && user && house.owner && user._id === (house.owner._id || house.owner);

  return (
    <div className="details-page">
      <button className="btn" onClick={() => navigate(-1)}>
        Back
      </button>

      <div className="details-container">
        <div className="details-image"></div>

        <div className="details-info">
          <h1>{house.title}</h1>
          <p className="location">{house.location}</p>
          <p className="price">
            {house.price} / {house.type}
          </p>

          <p className="description">{house.description}</p>

          {house.owner && house.owner.name && (
            <p style={{ color: "#c4b5fd", marginTop: "10px" }}>
              Listed by: {house.owner.name} ({house.owner.email})
            </p>
          )}

          <div className="details-buttons">
            {isOwner && (
              <>
                <button className="btn" onClick={() => navigate(`/edit/${id}`)}>Edit</button>
                <button className="btn btn-secondary" onClick={handleDelete}>Delete</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HouseDetails;
