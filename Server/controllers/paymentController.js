const deliveryService = require('../services/DeliveryServiceFacade');


const processPayment = async (req, res) => {
    try {
        const updatedDeliveryRequest = await deliveryService.processPayment(req.body);
        res.status(200).json({
            message: 'Payment successful!',
            deliveryRequest: updatedDeliveryRequest,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { processPayment };
