const express = require('express');
const { 
    createDeliveryRequest, 
    getTrackingStatus, 
    shipDelivery,
    rateDelivery
} = require('../controllers/deliveryController');

const router = express.Router();

router.post('/create-request', createDeliveryRequest);
router.get('/track/:trackingId', getTrackingStatus);
router.post('/ship/:trackingId', shipDelivery);
router.post('/rate/:trackingId', rateDelivery);

module.exports = router;