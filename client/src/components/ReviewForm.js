import React, { useState } from "react";
import "../styles/ReviewForm.css"; // Assuming you have a similar CSS file for styling

const ReviewForm = () => {
    const [trackingId, setTrackingId] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState("");
    const [message, setMessage] = useState("");
    const [reviews, setReviews] = useState([]); // Local state for reviews

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!trackingId || !review || !rating) {
            setMessage("Please fill out all fields.");
            return;
        }

        // Add the new review to the reviews list
        setReviews([...reviews, { trackingId, review, rating }]);

        // Reset the form
        setTrackingId("");
        setReview("");
        setRating("");
        setMessage("Review submitted successfully!");
    };

    return (
        <div className="forms">
            <h2>Submit a Review</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-fields">
                    <input
                        type="text"
                        value={trackingId}
                        onChange={(e) => setTrackingId(e.target.value)}
                        placeholder="Tracking ID"
                        required
                    />
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Write your review"
                        rows="5"
                        required
                    ></textarea>
                    <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                    >
                        <option value="">Select Rating</option>
                        <option value="5">5 - Excellent</option>
                        <option value="4">4 - Good</option>
                        <option value="3">3 - Average</option>
                        <option value="2">2 - Poor</option>
                        <option value="1">1 - Terrible</option>
                    </select>
                    <button type="submit" className="next-button">Submit Review</button>
                </div>
            </form>

            {message && <p className="message">{message}</p>}

            <div className="reviews-container">
                <h3>Submitted Reviews</h3>
                {reviews.length === 0 ? (
                    <p>No reviews submitted yet.</p>
                ) : (
                    <ul>
                        {reviews.map((rev, index) => (
                            <li key={index} className="review-item">
                                <strong>Tracking ID:</strong> {rev.trackingId} <br />
                                <strong>Review:</strong> {rev.review} <br />
                                <strong>Rating:</strong> {rev.rating} -{" "}
                                {["Terrible", "Poor", "Average", "Good", "Excellent"][rev.rating - 1]}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ReviewForm;
