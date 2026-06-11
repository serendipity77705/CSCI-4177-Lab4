import React, { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { apartments, reviews } from "../data/mockData";
import "../css/apartment.css";
import { useAuth } from "../context/AuthContext";

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

function ReviewCard({ rating, body, date, author }) {
  const initials = author
    ? author.split(" ").filter(Boolean).map(p => p[0]).slice(0, 2).join("").toUpperCase()
    : "";
  return (
    <div className="review-card">
      <div className="review-header">
        <span className="review-initials">{initials}</span>
        <span className="review-author">{author}</span>
        <span>{date}</span>
        <StarRating rating={rating} />
      </div>
      <p>{body}</p>
    </div>
  );
}

function ModalPopUp({ onClose, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState("");

  function handleSubmit() {
    if (rating === 0 || !body.trim()) return;
    onSubmit({ rating, body });
    onClose();
  }

  return (
    <div>
      <div className="modal-header">
        <h2>Write a Review</h2>
        <button onClick={onClose}>✕</button>
      </div>

      <p className="field-label">Your rating</p>
      <div className="star-input">
        {[1, 2, 3, 4, 5].map(n => (
          <span key={n} onClick={() => setRating(n)}
            className={n <= rating ? "filled" : ""}>
            {n <= rating ? "★" : "☆"}
          </span>
        ))}
      </div>

      <p className="field-label">Your review</p>
      <textarea
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder="What was your experience living here?"
      />

      <div className="modal-actions">
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleSubmit}>Submit Review</button>
      </div>
    </div>
  );
}

export default function Apartment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth() || {};
  const [showReview, setShowReview] = useState(false);
  const [localReviews, setLocalReviews] = useState(reviews);

  const apartment = apartments.find((a) => a.id === Number(id));
  const aptReviews = localReviews.filter((r) => r.aptId === apartment?.id);

  const breakdown = useMemo(
    () =>
      [5, 4, 3, 2, 1].map((star) => ({
        star,
        count: aptReviews.filter((r) => Math.round(r.rating) === star).length,
      })),
    [aptReviews]
  );

  function handleSubmitReview({ rating, body }) {
    const newReview = {
      id: localReviews.length + 1,
      aptId: apartment.id,
      userName: user?.name || "Anonymous",
      rating,
      review: body,
      date: new Date().toISOString().split("T")[0],
      replies: []
    };
    setLocalReviews([...localReviews, newReview]);
  }

  if (!apartment) {
    return (
      <>
        <NavBar />
        <div className="apartment-page">
          <div className="apartment-content">
            <button type="button" className="back-link" onClick={() => navigate("/dashboard")}>
              ← Back to dashboard
            </button>
            <p>Apartment not found.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="apartment-page">
        <div className="apartment-content">
          <button type="button" className="back-link" onClick={() => navigate("/dashboard")}>
            ← Back to dashboard
          </button>

          <div className="apartment-detail">
            <div className="apartment-info">
              <h1>{apartment.name}</h1>
              <p>📍 {apartment.address}</p>
              <p>{apartment.shortSummary}</p>
            </div>
            <div className="apartment-rating">
              <h1>{apartment.rating}</h1>
              <StarRating rating={apartment.rating} />
              <p>{apartment.reviewCount} reviews</p>
            </div>
          </div>

          <div className="apartment-body">
            <div className="apartment-main">
              {apartment.aiSummary && (
                <div className="ai-summary">
                  <p id="summary">✨ AI-GENERATED SUMMARY</p>
                  <p>{apartment.aiSummary}</p>
                </div>
              )}

              <div className="key-issues">
                <p><strong>Key Issues</strong></p>
                {apartment.tags && apartment.tags.map((tag, idx) => (
                  <span key={idx} className="tag">{tag}</span>
                ))}
              </div>

              <div className="reviews">
                <div className="header">
                  <h2>Reviews ({aptReviews.length})</h2>
                  <button onClick={() => setShowReview(true)}>+ Write a Review</button>
                </div>
                {aptReviews.length > 0 ? (
                  aptReviews.map((r, idx) => (
                    <ReviewCard key={idx} rating={r.rating} body={r.review}
                      date={r.date} author={r.userName} />
                  ))
                ) : (
                  <p className="no-results">No reviews yet</p>
                )}
              </div>
            </div>

            <div className="apartment-sidebar">
              <div className="property-info">
                <h3>Property Info</h3>
                <div className="info-row"><span>Landlord</span><span>{apartment.landlord}</span></div>
                <div className="info-row"><span>Units</span><span>{apartment.numUnits}</span></div>
                <div className="info-row"><span>Year Built</span><span>{apartment.yearBuilt}</span></div>
                <div className="info-row"><span>Neighbourhood</span><span>{apartment.neighbourhood}</span></div>
              </div>

              <div className="rating-breakdown">
                <h3>Rating Breakdown</h3>
                {breakdown.map(({ star, count }) => (
                  <div key={star} className="rating-row">
                    <span>{star} ★</span>
                    <div className="rating-bar">
                      <div className="rating-bar-fill"
                        style={{ width: aptReviews.length ? `${(count / aptReviews.length) * 100}%` : "0%" }} />
                    </div>
                    <span>{count}</span>
                  </div>
                ))}
              </div>

              <button className="write-review-btn" onClick={() => setShowReview(true)}>
                Write a Review
              </button>
            </div>
          </div>
        </div>
      </div>

      {showReview && (
        <div className="modal-overlay" onClick={() => setShowReview(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <ModalPopUp
              onClose={() => setShowReview(false)}
              onSubmit={handleSubmitReview}
            />
          </div>
        </div>
      )}
    </>
  );
}