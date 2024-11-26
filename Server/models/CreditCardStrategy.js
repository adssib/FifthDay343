const PaymentStrategy = require('./PaymentStrategy');  // Parent class

class CreditCardStrategy extends PaymentStrategy {
  async processPayment(paymentDetails) {
    console.log("Processing Credit Card payment:", paymentDetails);
    return {
      success: true,
      paymentDetails,
    };
  }
}

module.exports = CreditCardStrategy;
