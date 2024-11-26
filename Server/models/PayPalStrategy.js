const PaymentStrategy = require('./PaymentStrategy');  // Parent class

class PayPalStrategy extends PaymentStrategy {
  async processPayment(paymentDetails) {
    console.log("Processing PayPal payment:", paymentDetails);
    return {
      success: true,
      paymentDetails
    };
  }
}

module.exports = PayPalStrategy;
