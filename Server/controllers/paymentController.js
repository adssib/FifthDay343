const { deliveryRequests } = require('../controllers/deliveryController');  // Import the delivery requests
const CreditCardStrategy = require('../models/CreditCardStrategy');
const PayPalStrategy = require('../models/PayPalStrategy');

const deliveryService = require('../services/DeliveryServiceFacade');

const processPayment = (req, res) => {
    const { trackingId, name, email, phone, paymentMethod } = req.body;

    console.log('Received payment details:', req.body);

    // Validate the incoming request data
    if (!trackingId || !name || (!email && !phone) || !paymentMethod) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Find the delivery request by trackingId
    const deliveryRequest = deliveryRequests.find(request => request.id === trackingId);

    console.log('Found delivery request:', deliveryRequest);

    // If the delivery request does not exist, return an error response
    if (!deliveryRequest) {
        return res.status(404).json({ message: 'Delivery request not found' });
    }

    // Select the appropriate payment strategy based on the payment method
    let strategy;
    if (paymentMethod === 'credit') {
        strategy = new CreditCardStrategy();
    } else if (paymentMethod === 'paypal') {
        strategy = new PayPalStrategy();
    } else {
        return res.status(400).json({ message: 'Invalid payment method selected.' });
    }

    // Execute the selected payment strategy
    strategy.processPayment({ name, email, phone })
        .then(paymentResult => {
            if (!paymentResult.success) {
                return res.status(500).json({
                    message: 'Payment failed.',
                    error: paymentResult.error, // Provide details if payment fails
                });
            }

            // Process the delivery request after successful payment
            try {
                const updatedDeliveryRequest = deliveryService.processPayment(req.body);
                res.status(200).json({
                    message: 'Payment successful!',
                    deliveryRequest: updatedDeliveryRequest,
                });
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        })
        .catch(error => {
            // Handle any errors that occur during payment processing
            res.status(500).json({
                message: 'Payment processing error.',
                error: error.message,  // Provide details about the error
            });
        });
};

module.exports = { processPayment };
