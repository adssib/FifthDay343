const deliveryService = require('../services/DeliveryServiceFacade');

const processPayment = (req, res) => {
    try {
        const updatedDeliveryRequest = deliveryService.processPayment(req.body);
        res.status(200).json({
            message: 'Payment successful!',
            deliveryRequest: updatedDeliveryRequest,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { processPayment };
