import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHouse, deleteHouse, getUser, isLoggedIn } from "../api";
import "./HouseDetails.css";

const fallbackImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200";

function formatPrice(price) {
  return `€${price.toLocaleString('nl-NL')}`;
}

function HouseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImage, setCurrentImage] = useState(0);

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

  if (loading) return <div className="details-page"><div className="details-loading">Loading property...</div></div>;
  if (error) return <div className="details-page"><div className="details-loading" style={{ color: "#ef4444" }}>{error}</div></div>;
  if (!house) return <div className="details-page"><div className="details-loading">Property not found.</div></div>;

  const isOwner = isLoggedIn() && user && house.owner && user._id === (house.owner._id || house.owner);

  // Build images array
  const images = house.images && house.images.length > 0
    ? house.images
    : house.image
      ? [house.image.startsWith('http') ? house.image : `/uploads/${house.image}`]
      : [fallbackImage];

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  const mapQuery = house.coordinates?.lat && house.coordinates?.lng
    ? `${house.coordinates.lat},${house.coordinates.lng}`
    : encodeURIComponent(house.location);

  return (
    <div className="details-page">
      {/* Image Gallery */}
      <div className="details-gallery">
        <img src={images[currentImage]} alt={house.title} className="details-gallery-img" />
        <div className="details-gallery-overlay"></div>

        {images.length > 1 && (
          <>
            <div className="details-gallery-arrows">
              <button className="gallery-arrow" onClick={prevImage}>&#8249;</button>
              <button className="gallery-arrow" onClick={nextImage}>&#8250;</button>
            </div>
            <div className="details-gallery-nav">
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`details-gallery-dot ${i === currentImage ? 'active' : ''}`}
                  onClick={() => setCurrentImage(i)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="details-content">
        <div className="details-top">
          <div className="details-title">
            <h1>{house.title}</h1>
            <p className="details-location">{house.location}</p>
          </div>
          <div className="details-price-box">
            <p className="details-price">{formatPrice(house.price)}</p>
            <p className="details-price-type">
              For {house.type}{house.type === 'rent' ? ' / month' : ''}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="details-stats">
          {house.bedrooms > 0 && (
            <div className="details-stat">
              <span className="details-stat-value">{house.bedrooms}</span>
              <span className="details-stat-label">Bedrooms</span>
            </div>
          )}
          {house.bathrooms > 0 && (
            <div className="details-stat">
              <span className="details-stat-value">{house.bathrooms}</span>
              <span className="details-stat-label">Bathrooms</span>
            </div>
          )}
          {house.sqm > 0 && (
            <div className="details-stat">
              <span className="details-stat-value">{house.sqm}</span>
              <span className="details-stat-label">m²</span>
            </div>
          )}
          {house.yearBuilt && (
            <div className="details-stat">
              <span className="details-stat-value">{house.yearBuilt}</span>
              <span className="details-stat-label">Year Built</span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="details-body">
          <div>
            <div className="details-description">
              <h2>About This Property</h2>
              <p>{house.description}</p>
            </div>

            {house.amenities && house.amenities.length > 0 && (
              <div className="details-amenities">
                <h2>Amenities & Features</h2>
                <div className="amenities-grid">
                  {house.amenities.map((amenity, i) => (
                    <div key={i} className="amenity-item">
                      <span className="amenity-dot"></span>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="details-sidebar">
            <div className="details-map">
              <iframe
                title="Property Location"
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY || 'AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8'}&q=${mapQuery}&zoom=14`}
                allowFullScreen
                loading="lazy"
              />
            </div>

            <div className="details-info-card">
              <h3>Property Details</h3>
              <div className="details-info-row">
                <span className="details-info-label">Type</span>
                <span className="details-info-value" style={{ textTransform: 'capitalize' }}>{house.type}</span>
              </div>
              {house.address?.city && (
                <div className="details-info-row">
                  <span className="details-info-label">City</span>
                  <span className="details-info-value">{house.address.city}</span>
                </div>
              )}
              {house.address?.country && (
                <div className="details-info-row">
                  <span className="details-info-label">Country</span>
                  <span className="details-info-value">{house.address.country}</span>
                </div>
              )}
              {house.sqm > 0 && (
                <div className="details-info-row">
                  <span className="details-info-label">Living Area</span>
                  <span className="details-info-value">{house.sqm} m²</span>
                </div>
              )}
              {house.yearBuilt && (
                <div className="details-info-row">
                  <span className="details-info-label">Year Built</span>
                  <span className="details-info-value">{house.yearBuilt}</span>
                </div>
              )}
            </div>

            {house.owner && house.owner.name && (
              <p className="details-owner">Listed by {house.owner.name}</p>
            )}

            {isOwner && (
              <div className="details-buttons">
                <button className="btn" onClick={() => navigate(`/edit/${id}`)}>Edit</button>
                <button className="btn btn-secondary" onClick={handleDelete}>Delete</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HouseDetails;
