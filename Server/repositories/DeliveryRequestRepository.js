//Class responsible for storing the delivery requests

class DeliveryRequestRepository {
    constructor() {
        // In-memory storage for delivery requests
        this.deliveryRequests = [];
        // Counter for generating unique tracking IDs
        this.trackingIdCounter = 1;
    }

    // Generate a unique tracking ID
    generateTrackingId() {
        return this.trackingIdCounter++;
    }

    // Add a new delivery request
    addDeliveryRequest(deliveryRequest) {
        this.deliveryRequests.push(deliveryRequest);
    }

    // Find a delivery request by tracking ID
    findDeliveryRequestById(trackingId) {
        return this.deliveryRequests.find(
            (request) => request.id === parseInt(trackingId)
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
            (request) => request.id !== parseInt(trackingId)
        );
    }

    // Get all delivery requests
    getAllDeliveryRequests() {
        return this.deliveryRequests;
    }
}

module.exports = new DeliveryRequestRepository();