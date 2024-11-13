const express = require('express');
const { createDeliveryRequest } = require('../controllers/deliveryController');
const router = express.Router();

router.post('/create-request', createDeliveryRequest);

module.exports = router;
