// CreditCardStrategy.js (CommonJS)
const PaymentStrategy = require('./PaymentStrategy');  // CommonJS import

class CreditCardStrategy extends PaymentStrategy {
    async processPayment(paymentDetails) {
        console.log("Processing credit card payment:", paymentDetails);
        return paymentDetails;
    }
}

module.exports = CreditCardStrategy;  // CommonJS export
