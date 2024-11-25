
const { deliveryRequests } = require('../controllers/deliveryController');  // Import the delivery requests
const CreditCardStrategy = require('../models/CreditCardStrategy');
const PayPalStrategy = require('../models/PayPalStrategy');




const deliveryService = require('../services/DeliveryServiceFacade');


const processPayment = (req, res) => {

    const { trackingId, name, email, phone, paymentMethod } = req.body;

    console.log('Received payment details:', req.body);

    // Validate
    if (!trackingId || !name || (!email && !phone) || !paymentMethod) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Find the delivery request by trackingId
    const deliveryRequest = deliveryRequests.find(request => request.id === trackingId);

    console.log('Found delivery request:', deliveryRequest);

     // Select the appropriate payment strategy
     let strategy;
     if (paymentMethod === 'credit') {
         strategy = new CreditCardStrategy();
     } else if (paymentMethod === 'paypal') {
         strategy = new PayPalStrategy();
     } else {
         return res.status(400).json({ message: 'Invalid payment method selected.' });
     }
 
     // Execute the selected payment strategy
     const paymentResult = strategy.processPayment({ name, email, phone });
 
     if (!paymentResult.success) {
         return res.status(500).json({
             message: 'Payment failed.',
             error: paymentResult.error, // Provide details if payment fails
         });
     }

    if (!deliveryRequest) {
        return res.status(404).json({ message: 'Delivery request not found' });

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
