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
    }) {
        this.id = id;
        this.customer = customer;
        this.tracking = tracking;
        this.payment = payment;
        this.pickupLocation = pickupLocation;
        this.dropoffLocation = dropoffLocation;

        // Convert dimensions to numbers
        this.dimensions = {
            length: Number(dimensions.length),
            width: Number(dimensions.width),
            height: Number(dimensions.height),
        };

        // Convert weight to a number
        this.weight = Number(weight);

        this.shippingMethod = shippingMethod;
        this.rating = null; // Initialize rating as null
    }

    validate() {
        // Validate required fields
        if (!this.pickupLocation || !this.dropoffLocation || !this.dimensions || !this.weight || !this.shippingMethod) {
            console.error('Missing required fields:', {
                pickupLocation: this.pickupLocation,
                dropoffLocation: this.dropoffLocation,
                dimensions: this.dimensions,
                weight: this.weight,
                shippingMethod: this.shippingMethod,
            });
            throw new Error('All fields are required');
        }

        console.log('Validating locations...');
        // Validate locations
        if (!this.pickupLocation || typeof this.pickupLocation !== 'string') {
            console.error('Invalid pickup address:', this.pickupLocation);
            throw new Error('Invalid pickup address');
        }

        if (!this.dropoffLocation || typeof this.dropoffLocation !== 'string') {
            console.error('Invalid dropoff address:', this.dropoffLocation);
            throw new Error('Invalid dropoff address');
        }

        // Validate dimensions
        if (!this.dimensions.length || !this.dimensions.width || !this.dimensions.height) {
            console.error('Invalid dimensions:', this.dimensions);
            throw new Error('Invalid dimensions provided');
        }

        // Validate weight
        if (isNaN(this.weight) || this.weight <= 0) {
            console.error('Invalid weight:', this.weight);
            throw new Error('Invalid weight');
        }
        console.log('successfully validated the request');
    }

    calculateQuote() {
        return QuoteCalculator.calculateQuote(this.weight, this.shippingMethod);
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
