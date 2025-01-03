const { reviews } = require('../models/ReviewModel');
const { validateTrackingId } = require('../services/ReviewService');

const submitReview = (req, res) => {
  try {
    const { trackingId, review, rating } = req.body;

    if (!trackingId || !review) {
      return res.status(400).json({ error: "Tracking ID and review content are required." });
    }

    validateTrackingId(trackingId);

    reviews.push({
      trackingId,
      review,
      rating: rating || null,
      timestamp: new Date(),
    });

    res.status(200).json({ success: "Review submitted successfully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllReviews = (req, res) => {
  res.status(200).json(reviews);
};

module.exports = { submitReview, getAllReviews };
