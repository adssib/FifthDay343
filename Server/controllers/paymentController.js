const { deliveryRequests } = require('../controllers/deliveryController');

// Process payment and update the delivery request
const processPayment = (req, res) => {
    const { trackingId, name, email, phone, paymentMethod } = req.body;

    console.log('Received payment details:', req.body);

    // Validate
    if (!trackingId || !name || (!email && !phone) || !paymentMethod) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Find the delivery request by trackingId
    const deliveryRequest = deliveryRequests.find(request => request.trackingId === trackingId);

    console.log('Found delivery request:', deliveryRequest);

    if (!deliveryRequest) {
        return res.status(404).json({ message: 'Delivery request not found' });
    }

    // Update the delivery request with payment info
    deliveryRequest.name = name;
    deliveryRequest.email = email;
    deliveryRequest.phone = phone;
    deliveryRequest.paymentStatus = 'Completed';
    deliveryRequest.status = 'Pending';

    console.log('Updated Delivery Request:', deliveryRequest);

    return res.status(200).json({
        message: 'Payment successful!',
        deliveryRequest,  // Return the updated delivery request object
    });
};

module.exports = { processPayment };
