const deliveryServiceFacade = require('../services/DeliveryServiceFacade');

class ChatbotService {
    processMessage(message) {
        const lowercaseMessage = message.toLowerCase();

        let queryType = null;

        // Determine query type
        if (lowercaseMessage.includes('track') || lowercaseMessage.includes('status')) {
            queryType = 'tracking';
        } else if (lowercaseMessage.includes('help') || lowercaseMessage.includes('support')) {
            queryType = 'general';
        } else if (lowercaseMessage.includes('service') || lowercaseMessage.includes('shipping')) {
            queryType = 'service';
        }

        // Handle the query using a switch statement
        switch (queryType) {
            case 'tracking':
                return this.handleTrackingQuery(lowercaseMessage);

            case 'general':
                return "How can I assist you? You can ask about tracking a package, delivery times, or our services.";

            case 'service':
                return "We offer various shipping services including standard and express delivery. How can I help you with our services?";

            default:
                return "I'm sorry, I didn't understand that. Can you please rephrase your question?";
        }
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
          // No tracking number found in the message
            return "To track your package, please provide the tracking number.";
        }
    }
}

module.exports = ChatbotService;
