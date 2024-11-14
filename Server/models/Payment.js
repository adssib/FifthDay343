class Payment {
    constructor({ paymentMethod = 'ok' }) {
        this.paymentMethod = paymentMethod;
    }

    updatePaymentMethod(method) {
        this.paymentMethod = method;
    }
}
module.exports = Payment;
