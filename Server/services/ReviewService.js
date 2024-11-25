const { deliveries } = require('../models/ReviewModel');

const validateTrackingId = (trackingId) => {
  const delivery = deliveries[trackingId];
  if (!delivery) {
    throw new Error("Invalid Tracking ID.");
  }
  if (delivery.deliveryStatus !== "Delivered") {
    throw new Error("Package not yet delivered.");
  }
  return true;
};

module.exports = { validateTrackingId };
