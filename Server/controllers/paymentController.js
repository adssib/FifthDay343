const { deliveryRequests } = require('../controllers/deliveryController');  // Import the delivery requests
const CreditCardStrategy = require('../models/CreditCardStrategy');
const PayPalStrategy = require('../models/PayPalStrategy');




// Process payment and update the delivery request
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
    }

    // Update customer details
    deliveryRequest.customer.name = name;
    deliveryRequest.customer.email = email;
    deliveryRequest.customer.phone = phone;

    // Update payment method and payment status
    deliveryRequest.payment.paymentMethod = paymentMethod;
    deliveryRequest.payment.status = 'Paid';  // Assuming successful payment

    // Update payment status and delivery request status
    deliveryRequest.paymentStatus = 'Paid';
    deliveryRequest.tracking.status = 'Pending';

    console.log('Updated Delivery Request:', deliveryRequest);

    return res.status(200).json({
        message: 'Payment successful!',
        deliveryRequest,  // Return the updated delivery request object
    });
};

module.exports = { processPayment };
