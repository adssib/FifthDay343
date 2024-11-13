const DeliveryRequest = require('../models/DeliveryRequest');

// Mock database to store delivery requests
let deliveryRequests = [];
let trackingIdCounter = 1;

// Create a new delivery request and return a quote
const createDeliveryRequest = (req, res) => {
    const { pickupLocation, dropoffLocation, dimensions, weight, shippingMethod } = req.body;

    // Validate if all required fields are present
    if (!pickupLocation || !dropoffLocation || !dimensions || !weight || !shippingMethod) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Validate dimensions
    if (!dimensions.length || !dimensions.width || !dimensions.height) {
        return res.status(400).json({ message: "Invalid dimensions provided" });
    }

    // Validate weight
    if (isNaN(weight) || weight <= 0) {
        return res.status(400).json({ message: "Invalid weight" });
    }

    // Generate a tracking ID
    const trackingId = trackingIdCounter++;

    // Create the delivery request object
    const deliveryRequest = new DeliveryRequest({
        trackingId,
        pickupLocation,
        dropoffLocation,
        dimensions,
        weight,
        shippingMethod,
    });

    // Calculate the quote
    const quote = deliveryRequest.calculateQuote();

    // Calculate estimated arrival date
    const estimatedArrivalDate = deliveryRequest.calculateEstimatedArrival();

    // Update delivery request with estimated arrival date
    deliveryRequest.estimatedArrival = estimatedArrivalDate;

    // Add the new delivery request to the mock database
    deliveryRequests.push(deliveryRequest);

    // Send the quote and tracking ID back to the frontend
    res.json({
        trackingId,
        quote,
        message: 'Delivery request created successfully!',
    });
};

// Function to retrieve the tracking status by tracking ID
const getTrackingStatus = (req, res) => {
    const { trackingId } = req.params;

    // Find the delivery request by trackingId
    const deliveryRequest = deliveryRequests.find(request => request.trackingId === parseInt(trackingId));

    if (!deliveryRequest) {
        return res.status(404).json({ message: 'Delivery request not found' });
    }

    // Return the full details of the delivery request
    res.json({
        trackingId: deliveryRequest.trackingId,
        pickupLocation: deliveryRequest.pickupLocation,
        dropoffLocation: deliveryRequest.dropoffLocation,
        dimensions: deliveryRequest.dimensions,
        weight: deliveryRequest.weight,
        shippingMethod: deliveryRequest.shippingMethod,
        name: deliveryRequest.name,
        email: deliveryRequest.email,
        phone: deliveryRequest.phone,
        paymentStatus: deliveryRequest.paymentStatus,
        status: deliveryRequest.status,
        estimatedArrival: deliveryRequest.estimatedArrival,
        quote: deliveryRequest.calculateQuote(),
    });
};


// Function to update payment status (from paymentController)
const updatePaymentStatus = (trackingId, status) => {
    const deliveryRequest = deliveryRequests.find(req => req.trackingId === trackingId);

    if (deliveryRequest) {
        deliveryRequest.updatePaymentStatus(status);
    }
};

module.exports = { deliveryRequests, createDeliveryRequest, getTrackingStatus, updatePaymentStatus };
