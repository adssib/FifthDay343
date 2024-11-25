class Payment {
    constructor({ paymentMethod = 'ok' }) {
        this.paymentMethod = paymentMethod;
    }

    updatePaymentMethod(method) {
        this.paymentMethod = method;
    }
}
export default Payment;

