// PayPalStrategy.js (CommonJS)
const PaymentStrategy = require('./PaymentStrategy');  // Use `require` to import the class

class PayPalStrategy extends PaymentStrategy {
    async processPayment(paymentDetails) {
        // Add logic for any specific PayPal validation if necessary
        console.log("Processing PayPal payment:", paymentDetails);
        return paymentDetails; // This is what gets sent to the backend
    }
}

module.exports = PayPalStrategy;  // Use `module.exports` to export the class
