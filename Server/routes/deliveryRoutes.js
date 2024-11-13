const express = require('express');
const { createDeliveryRequest } = require('../controllers/deliveryController');
const { getTrackingStatus } = require('../controllers/deliveryController');
const router = express.Router();

router.post('/create-request', createDeliveryRequest);
router.get('/track/:trackingId', getTrackingStatus);

module.exports = router;
