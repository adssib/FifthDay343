const QuoteCalculator = require('../services/QuoteCalculator');

class DeliveryRequest {
    constructor({
        id,
        customer,
        tracking,
        payment,
        pickupLocation,
        dropoffLocation,
        dimensions,
        weight,
        shippingMethod,
        paymentStatus = 'Pending',
    }) {
        this.id = id;
        this.customer = customer;
        this.tracking = tracking;
        this.payment = payment;
        this.pickupLocation = pickupLocation;
        this.dropoffLocation = dropoffLocation;
        this.dimensions = dimensions;
        this.weight = weight;
        this.shippingMethod = shippingMethod;
        this.paymentStatus = paymentStatus;
        this.rating = null; // Initialize rating as null
    }

    validate() {
        // Validate required fields
        if (!this.pickupLocation || !this.dropoffLocation || !this.dimensions || !this.weight || !this.shippingMethod) {
            throw new Error('All fields are required');
        }

        // Validate locations
        if (
            !this.pickupLocation.lat || !this.pickupLocation.lng ||
            !this.dropoffLocation.lat || !this.dropoffLocation.lng
        ) {
            throw new Error('Invalid coordinates for pickup or dropoff location');
        }

        // Validate dimensions
        if (!this.dimensions.length || !this.dimensions.width || !this.dimensions.height) {
            throw new Error('Invalid dimensions provided');
        }

        // Validate weight
        if (isNaN(this.weight) || this.weight <= 0) {
            throw new Error('Invalid weight');
        }
    }

    calculateQuote() {
        return QuoteCalculator.calculateQuote(this.weight, this.shippingMethod);
    }

    updatePaymentStatus(status) {
        this.paymentStatus = status;
    }

    setRating(rating) {
        if (rating >= 1 && rating <= 5) {
            this.rating = rating;
            return true;
        }
        return false;
    }
}

module.exports = DeliveryRequest;
