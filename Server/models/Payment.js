class Payment {
    constructor({ paymentMethod = '', status = 'Pending' } = {}) {
        this.paymentMethod = paymentMethod;
        this.status = status;
    }

    processPayment(method) {
        this.paymentMethod = method;
        this.status = 'Paid'; // Assuming payment is successful
    }
}

module.exports = Payment;
