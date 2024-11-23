const Customer = require('../models/Customer');
const Tracking = require('../models/Tracking');
const Payment = require('../models/Payment');
const DeliveryRequest = require('../models/DeliveryRequest');

// Mock database to store delivery requests
let deliveryRequests = [];
let trackingIdCounter = 1;

// Create a new delivery request 
const createDeliveryRequest = (req, res) => {
    const { pickupLocation, dropoffLocation, dimensions, weight, shippingMethod } = req.body;

    // Validate if all required fields are present
    if (!pickupLocation || !dropoffLocation || !dimensions || !weight || !shippingMethod) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Validate locations
    if (
        !pickupLocation.lat || !pickupLocation.lng || 
        !dropoffLocation.lat || !dropoffLocation.lng
    ) {
        return res.status(400).json({ message: "Invalid coordinates for pickup or dropoff location" });
    }

    // Validate dimensions
    if (!dimensions.length || !dimensions.width || !dimensions.height) {
        return res.status(400).json({ message: "Invalid dimensions provided" });
    }

    // Validate weight
    if (isNaN(weight) || weight <= 0) {
        return res.status(400).json({ message: "Invalid weight" });
    }


    const customer = new Customer({ name: "", email: "", phone: "" });
    const tracking = new Tracking({ estimatedArrival: null, status: 'Pending' }); // Default status
    const payment = new Payment({ paymentMethod: '', status: 'Pending' }); // Default payment method

    // Generate a tracking ID
    const trackingId = trackingIdCounter++;

    // Create the delivery request object
    const deliveryRequest = new DeliveryRequest({
        id: trackingId,
        customer,
        tracking,
        payment,
        pickupLocation,
        dropoffLocation,
        dimensions,
        weight,
        shippingMethod,
        paymentStatus: 'Pending',
    });

    // Calculate the quote
    const quote = deliveryRequest.calculateQuote();

    // Calculate estimated arrival date
    const estimatedArrivalDate = deliveryRequest.tracking.calculateEstimatedArrival(shippingMethod);

    // Update delivery request with estimated arrival date
    deliveryRequest.tracking.estimatedArrival = estimatedArrivalDate;

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
    const deliveryRequest = deliveryRequests.find(request => request.id === parseInt(trackingId));

    if (!deliveryRequest) {
        return res.status(404).json({ message: 'Delivery request not found' });
    }

    // Return the full details of the delivery request
    res.json({
        trackingId: deliveryRequest.id,
        pickupLocation: deliveryRequest.pickupLocation,
        dropoffLocation: deliveryRequest.dropoffLocation,
        dimensions: deliveryRequest.dimensions,
        weight: deliveryRequest.weight,
        shippingMethod: deliveryRequest.shippingMethod,
        customer: deliveryRequest.customer,
        payment: deliveryRequest.payment,
        paymentStatus: deliveryRequest.paymentStatus,
        status: deliveryRequest.tracking.status,
        estimatedArrival: deliveryRequest.tracking.estimatedArrival,
        quote: deliveryRequest.calculateQuote(),
    }); 
};

module.exports = { deliveryRequests, createDeliveryRequest, getTrackingStatus };
