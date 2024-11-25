const Customer = require('../models/Customer');
const Tracking = require('../models/Tracking');
const Payment = require('../models/Payment');
const DeliveryRequest = require('../models/DeliveryRequest');
const DeliveryRequestRepository = require('../repositories/DeliveryRequestRepository');
const QuoteCalculator = require('./QuoteCalculator');
const DeliveryNotifier = require('../observers/DeliveryNotifier');
const EmailNotification = require('../observers/EmailNotification');
const SMSNotification = require('../observers/SMSNotification');


class DeliveryServiceFacade {
    constructor() {
        this.notifier = new DeliveryNotifier();


        // Create instances for observers
        this.emailObserver = new EmailNotification();
        this.smsObserver = new SMSNotification();


        this.notifiedStatuses = new Set();
    }


    // Create a new delivery request
    createDeliveryRequest(data) {
        const {
            pickupLocation,
            dropoffLocation,
            dimensions,
            weight,
            shippingMethod,
            customerInfo,
        } = data;

        // Create instances of models
        const customer = new Customer(customerInfo || {});
        const tracking = new Tracking();
        const payment = new Payment();

        // Generate a unique tracking ID
        const trackingId = DeliveryRequestRepository.generateTrackingId();

        // Create the delivery request object
        const deliveryRequest = new DeliveryRequest({
            id: trackingId,
            customer,
            tracking,
            payment,
            pickupLocation,
            dropoffLocation,
            dimensions,
            weight,
            shippingMethod,
        });

        // Validate the delivery request
        deliveryRequest.validate();

        // Calculate the quote
        const quote = deliveryRequest.calculateQuote();

        // Calculate estimated arrival date
        tracking.calculateEstimatedArrival(shippingMethod);

        // Add the delivery request to the repository
        DeliveryRequestRepository.addDeliveryRequest(deliveryRequest);

        // Return the tracking ID and quote
        return { trackingId, quote };
    }

    // Process payment for a delivery request
    processPayment(data) {
        const { trackingId, name, email, phone, paymentMethod } = data;

        console.log('Received payment details:', data);

        // Validate
        if (!trackingId || !name || (!email && !phone) || !paymentMethod) {
            throw new Error('Missing required fields');
        }

        // Validate the payment method
        const validPaymentMethods = ['credit', 'paypal'];
        if (!validPaymentMethods.includes(paymentMethod)) {
            throw new Error('Invalid payment method. Please choose a valid payment option.');
        }

        // Find the delivery request
        const deliveryRequest = this.findDeliveryRequest(trackingId);

        console.log('Found delivery request:', deliveryRequest);

        // Update customer details
        deliveryRequest.customer = new Customer({ name, email, phone });

        // Attach observers based on the updated customer information if not already attached
        if (email && !this.notifier.observers.includes(this.emailObserver)) {
            this.notifier.attach(this.emailObserver);
            console.log("EmailNotification observer attached.");
        }


        if (phone && !this.notifier.observers.includes(this.smsObserver)) {
            this.notifier.attach(this.smsObserver);
            console.log("SMSNotification observer attached.");
        }


        // Process the payment
        deliveryRequest.payment.processPayment(paymentMethod);

        // Update tracking status
        deliveryRequest.tracking.updateStatus('Shipped');

        // Update the delivery request in the repository
        DeliveryRequestRepository.updateDeliveryRequest(deliveryRequest);

        console.log('Updated Delivery Request:', deliveryRequest);

        // Return the updated delivery request
        return deliveryRequest;
    }

    // Get tracking status for a delivery request
    getTrackingStatus(trackingId) {
        const deliveryRequest = this.findDeliveryRequest(trackingId);

        // Return the delivery request details
        return {
            trackingId: deliveryRequest.id,
            pickupLocation: deliveryRequest.pickupLocation,
            dropoffLocation: deliveryRequest.dropoffLocation,
            dimensions: deliveryRequest.dimensions,
            weight: deliveryRequest.weight,
            shippingMethod: deliveryRequest.shippingMethod,
            customer: deliveryRequest.customer,
            payment: deliveryRequest.payment,
            status: deliveryRequest.tracking.status,
            estimatedArrival: deliveryRequest.tracking.estimatedArrival,
            quote: deliveryRequest.calculateQuote(),
        };
    }

    // Ship the package
    // added statuses that change every 5 seconds
    shipDelivery(trackingId) {
        const deliveryRequest = this.findDeliveryRequest(trackingId);

        if (!deliveryRequest) {
            throw new Error('Delivery request not found');
        }

        const statuses = [
            'Awaiting Pickup',
            'Picked Up',
            'In Transit',
            'Arrived at Facility',
            'Out for Delivery',
            'Successfully Delivered'
        ];

        let statusIndex = 0;

        console.log(`Delivery process started for tracking ID: ${trackingId}`);

        const interval = setInterval(() => {
            if (statusIndex < statuses.length) {
                deliveryRequest.tracking.updateStatus(statuses[statusIndex]);

                if (!this.notifiedStatuses.has(statuses[statusIndex])) {
                    this.notifier.notifyObservers(deliveryRequest.customer, statuses[statusIndex]);
                    this.notifiedStatuses.add(statuses[statusIndex]);
                }

                if (statusIndex === statuses.length - 1) {
                    clearInterval(interval);
                }
                statusIndex++;
            }
        }, 5000);

        return { message: 'Delivery process started', trackingId };
    }

    // Rate the delivery
    rateDelivery(trackingId, rating) {
        const deliveryRequest = this.findDeliveryRequest(trackingId);

        if (deliveryRequest.tracking.status !== 'Successfully Delivered') {
            throw new Error('Cannot rate a delivery that has not been delivered yet');
        }

        if (deliveryRequest.setRating(rating)) {
            // Update the delivery request in the repository
            DeliveryRequestRepository.updateDeliveryRequest(deliveryRequest);
            return { message: 'Rating submitted successfully', trackingId, rating };
        } else {
            throw new Error('Invalid rating. Please provide a rating between 1 and 5');
        }
    }

    // Helper method to find a delivery request by tracking ID
    findDeliveryRequest(trackingId) {
        const deliveryRequest = DeliveryRequestRepository.findDeliveryRequestById(trackingId);

        if (!deliveryRequest) {
            throw new Error('Delivery request not found');
        }

        return deliveryRequest;
    }
}

module.exports = new DeliveryServiceFacade();
