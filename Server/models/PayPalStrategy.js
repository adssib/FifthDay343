import PaymentStrategy from './PaymentStrategy';

class PayPalStrategy extends PaymentStrategy {
  async processPayment(paymentDetails) {
    // Add logic for any specific PayPal validation if necessary
    console.log("Processing PayPal payment:", paymentDetails);
    return paymentDetails; // This is what gets sent to the backend
  }
}

export default PayPalStrategy;