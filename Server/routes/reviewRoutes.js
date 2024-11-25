const express = require('express');
const { submitReview, getAllReviews } = require('../controllers/reviewController');

const router = express.Router();

router.post('/submit_review', submitReview);
router.get('/reviews', getAllReviews);

module.exports = router;
