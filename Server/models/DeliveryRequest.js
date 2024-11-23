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
    }

    calculateQuote() {
        return QuoteCalculator.calculateQuote(this.weight, this.shippingMethod);
    }

    updatePaymentStatus(status) {
        this.paymentStatus = status;
    }
}

module.exports = DeliveryRequest;
