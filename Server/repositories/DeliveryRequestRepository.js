// Responsible for storing the delivery requests objects
const crypto = require('crypto');

class DeliveryRequestRepository {
    constructor() {
        // In-memory storage for delivery requests
        this.deliveryRequests = [];
        // Set to store generated tracking IDs for uniqueness
        this.generatedTrackingIds = new Set();
    }

    // Generate a unique, random tracking ID
    generateTrackingId(length = 16) {
        if (length <= 0 || !Number.isInteger(length)) {
            throw new Error('Length must be a positive integer.');
        }

        // Define the alphanumeric character set
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        let trackingId;
        do {
            // Generate a random string of the required length
            trackingId = Array.from(crypto.randomBytes(length))
                .map(byte => chars[byte % chars.length]) // Map each byte to a character
                .join('');
        } while (this.generatedTrackingIds.has(trackingId)); // Ensure uniqueness

        // Add the generated ID to the set
        this.generatedTrackingIds.add(trackingId);

        return trackingId;
    }


    // Add a new delivery request
    addDeliveryRequest(deliveryRequest) {
        // Assign a unique tracking ID to the delivery request
        this.deliveryRequests.push(deliveryRequest);
    }

    // Find a delivery request by tracking ID
    findDeliveryRequestById(trackingId) {
        return this.deliveryRequests.find(
            (request) => request.id === trackingId
        );
    }

    // Update an existing delivery request
    updateDeliveryRequest(updatedRequest) {
        const index = this.deliveryRequests.findIndex(
            (request) => request.id === updatedRequest.id
        );
        if (index !== -1) {
            this.deliveryRequests[index] = updatedRequest;
        } else {
            throw new Error('Delivery request not found');
        }
    }

    // Remove a delivery request
    removeDeliveryRequest(trackingId) {
        this.deliveryRequests = this.deliveryRequests.filter(
            (request) => request.id !== trackingId
        );
        this.generatedTrackingIds.delete(trackingId);
    }

    // Get all delivery requests
    getAllDeliveryRequests() {
        return this.deliveryRequests;
    }
}

module.exports = new DeliveryRequestRepository();
