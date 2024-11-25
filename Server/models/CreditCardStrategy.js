import PaymentStrategy from './PaymentStrategy';

class CreditCardStrategy extends PaymentStrategy {
  async processPayment(paymentDetails) {
    // Add logic for any specific credit card validation if necessary
    console.log("Processing credit card payment:", paymentDetails);
    return paymentDetails; // This is what gets sent to the backend
  }
}

export default CreditCardStrategy;
