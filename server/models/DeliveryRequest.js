
class DeliveryRequest {

    constructor({
      trackingId,
      pickupLocation,
      dropoffLocation,
      dimensions,
      weight,
      shippingMethod,
      name = '',
      email = '',
      phone = '',
      paymentStatus = 'Pending',
      status = 'Pending',
      estimatedArrival = null,
    }) {
      this.trackingId = trackingId;
      this.pickupLocation = pickupLocation;
      this.dropoffLocation = dropoffLocation;
      this.dimensions = dimensions;
      this.weight = weight;
      this.shippingMethod = shippingMethod;
      this.name = name;
      this.email = email;
      this.phone = phone;
      this.paymentStatus = paymentStatus;
      this.status = status;
      this.estimatedArrival = estimatedArrival;
    }
  
    calculateQuote() {
      const basePrice = 10;  // Base price
      const weightCharge = this.weight * 2;  // $2 per kg
      const shippingCharge = this.shippingMethod === 'Express' ? 20 : 10;  // $20 for express, $10 for standard
      return basePrice + weightCharge + shippingCharge;
    }
  
    calculateEstimatedArrival() {
      const shippingDays = this.shippingMethod === 'Express' ? 3 : 5;
      const estimatedArrival = new Date();
      estimatedArrival.setDate(estimatedArrival.getDate() + shippingDays);
      return estimatedArrival.toISOString().split('T')[0]; // Format YYYY-MM-DD
    }
  
    updatePaymentStatus(status) {
      this.paymentStatus = status;
    }
  }
  
  module.exports = DeliveryRequest;
  