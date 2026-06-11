import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apartments, reviews } from "../data/mockData";
import NavBar from "../components/NavBar";
import "../css/profile.css";

function StarRating({ rating, max = 5 }) {
  const full = Math.round(rating);
  return (
    <span className="stars">
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={i < full ? "star-filled" : "star-empty"}>
          {i < full ? "★" : "☆"}
        </span>
      ))}
    </span>
  );
}

function EditModal({ review, onClose, onSave }) {
  const [rating, setRating] = useState(review.rating);
  const [body, setBody] = useState(review.review);

  function handleSave() {
    if (rating === 0 || !body.trim()) return;
    onSave({ ...review, rating, review: body });
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Review</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <p className="rating">Your rating</p>
        <div className="star-input">
          {[1, 2, 3, 4, 5].map(n => (
            <span key={n} onClick={() => setRating(n)}
              className={n <= rating ? "filled" : ""}>
              {n <= rating ? "★" : "☆"}
            </span>
          ))}
        </div>
        {rating > 0 && (
          <p className="rating-value">{rating}</p>
        )}

        <p className="field-label">Your review</p>
        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [localReviews, setLocalReviews] = useState(reviews);
  const [editingReview, setEditingReview] = useState(null);

  const initials = user
    ? (
        user.name.split(" ")[0][0] +
        user.name.split(" ")[user.name.split(" ").length - 1][0]
      ).toUpperCase()
    : "";

  const myReviews = localReviews.filter(r => r.userName === user?.name);

  function handleDelete(reviewToDelete) {
    setLocalReviews(localReviews.filter(r => r !== reviewToDelete));
  }

  function handleSaveEdit(updatedReview) {
    setLocalReviews(localReviews.map(r => r === editingReview ? updatedReview : r));
  }

  return (
    <>
      <NavBar onSearch={setSearchTerm} />
      <button className="back-link" onClick={() => navigate("/dashboard")}>
          ← Back to apartments
        </button>
      <div className="profile-page">
        <div className="profile-header">
          <div className="initials">{initials}</div>
          <div className="profile-header-left">
            <div>
              <h1>{user?.name}</h1>
              <p>{user?.email}</p>
            </div>
          </div>
          <div className="profile-stats">
            <div className="profile-stat">
              <span className="stat-number">{myReviews.length}</span>
              <span className="stat-label"> REVIEWS</span>
            </div>
            <div className="profile-stat">
              <span className="stat-number">
                {myReviews.reduce((acc, r) => acc + (r.replies?.length || 0), 0)}
              </span>
              <span className="stat-label"> COMMENTS</span>
            </div>
          </div>
        </div>

        <h2 className="section-title">Your Reviews</h2>

        {myReviews.length === 0 ? (
          <p className="no-results">You haven't written any reviews yet.</p>
        ) : (
          myReviews.map((r, idx) => {
            const apt = apartments.find(a => a.id === r.aptId);
            return (
              <div key={idx} className="profile-review-card">
                <div className="profile-review-left">
                  <h3>{apt ? apt.name : "Unknown Apartment"}</h3>
                  <StarRating rating={r.rating} />
                  <p>{r.review?.slice(0, 120)}{r.review?.length > 120 ? "..." : ""}</p>
                </div>
                <div className="profile-buttons">
                  <button className="view-button button"
                    onClick={() => navigate(`/apartments/${r.aptId}`)}>
                    View
                  </button>
                  <button className="edit-button button"
                    onClick={() => setEditingReview(r)}>
                    Edit
                  </button>
                  <button className="delete-button button"
                    onClick={() => handleDelete(r)}>
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {editingReview && (
        <EditModal
          review={editingReview}
          onClose={() => setEditingReview(null)}
          onSave={handleSaveEdit}
        />
      )}
    </>
  );
}
