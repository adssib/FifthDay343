class Tracking {
    constructor({ estimatedArrival = null, status = 'Pending' }) {
        this.estimatedArrival = estimatedArrival;
        this.status = status;
    }

    calculateEstimatedArrival(shippingMethod) {
        const shippingDays = shippingMethod === 'Express' ? 3 : 5;
        const estimatedArrival = new Date();
        estimatedArrival.setDate(estimatedArrival.getDate() + shippingDays);
        this.estimatedArrival = estimatedArrival.toISOString().split('T')[0]; // Format YYYY-MM-DD
        return this.estimatedArrival;
    }
}
module.exports = Tracking;
