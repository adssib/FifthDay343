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
        const basePrice = 10;  // Base price
        const weightCharge = this.weight * 2;  // $2 per kg
        const shippingCharge = this.shippingMethod === 'Express' ? 20 : 10;  // $20 for express, $10 for standard
        return basePrice + weightCharge + shippingCharge;
    }

    updatePaymentStatus(status) {
        this.paymentStatus = status;
    }
}

module.exports = DeliveryRequest;
