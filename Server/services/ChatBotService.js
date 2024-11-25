const deliveryServiceFacade = require('../services/DeliveryServiceFacade');

class ChatbotService {
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
        const trackingNumberMatch = message.match(/\d+/);

        if (trackingNumberMatch) {
            const trackingNumber = trackingNumberMatch[0];
            try {
                const status = deliveryServiceFacade.getTrackingStatus(trackingNumber);
                return `Your package with tracking number ${trackingNumber} is currently ${status.status}. Estimated delivery: ${status.estimatedArrival}.`;
            } catch (error) {
                return "I'm sorry, I couldn't find a package with that tracking number.";
            }
        } else {
            return "To track your package, please provide the tracking number.";
        }
    }
}

module.exports = ChatbotService;
