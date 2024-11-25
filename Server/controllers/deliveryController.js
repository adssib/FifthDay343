const deliveryService = require('../services/DeliveryServiceFacade');

const createDeliveryRequest = (req, res) => {
    try {
        const result = deliveryService.createDeliveryRequest(req.body);
        res.json({
            trackingId: result.trackingId,
            quote: result.quote,
            message: 'Delivery request created successfully!',
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getTrackingStatus = (req, res) => {
    try {
        const { trackingId } = req.params;
        const status = deliveryService.getTrackingStatus(trackingId);
        res.json(status);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const shipDelivery = (req, res) => {
    try {
        const { trackingId } = req.params;
        const result = deliveryService.shipDelivery(trackingId);
        res.json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const rateDelivery = (req, res) => {
    try {
        const { trackingId } = req.params;
        const { rating } = req.body;
        const result = deliveryService.rateDelivery(trackingId, rating);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createDeliveryRequest,
    getTrackingStatus,
    shipDelivery,
    rateDelivery,
};
