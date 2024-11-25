// services/QuoteCalculator.js

class QuoteCalculator {
    constructor() {
        if (QuoteCalculator.instance) {
            return QuoteCalculator.instance;
        }
        QuoteCalculator.instance = this;
    }

    calculateQuote(weight, shippingMethod) {
        const basePrice = 10;  // Base price
        const weightCharge = weight * 2;  // $2 per kg
        const shippingCharge = shippingMethod === 'Express' ? 20 : 10;  // $20 for express, $10 for standard
        return basePrice + weightCharge + shippingCharge;
    }
}

const instance = new QuoteCalculator();
Object.freeze(instance);

module.exports = instance;