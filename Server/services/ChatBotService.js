// services/ChatbotService.js

class ChatbotService {
    constructor(deliveryRequests) {
        this.deliveryRequests = deliveryRequests;
    }

    processMessage(message) {
        const lowercaseMessage = message.toLowerCase();

        // Check for tracking-related queries
        if (lowercaseMessage.includes('track') || lowercaseMessage.includes('status')) {
            return this.handleTrackingQuery(lowercaseMessage);
        }

        // Check for general inquiries
        if (lowercaseMessage.includes('help') || lowercaseMessage.includes('support')) {
            return "How can I assist you? You can ask about tracking a package, delivery times, or our services.";
        }

        // Check for service-related queries
        if (lowercaseMessage.includes('service') || lowercaseMessage.includes('shipping')) {
            return "We offer various shipping services including standard and express delivery. How can I help you with our services?";
        }

        // Default response
        return "I'm sorry, I didn't understand that. Can you please rephrase your question?";
    }

    handleTrackingQuery(message) {
        // Extract tracking number (assuming it's a number in the message)
        const trackingNumber = message.match(/\d+/);
        
        if (trackingNumber) {
            const package = this.deliveryRequests.find(req => req.id === parseInt(trackingNumber[0]));
            if (package) {
                return `Your package with tracking number ${trackingNumber[0]} is currently ${package.tracking.status}. Estimated delivery: ${package.tracking.estimatedArrival}.`;
            } else {
                return "I'm sorry, I couldn't find a package with that tracking number.";
            }
        } else {
            return "To track your package, please provide the tracking number.";
        }
    }
}

module.exports = ChatbotService;