const NotificationObserver = require('./NotificationObserver');

class SMSNotification extends NotificationObserver {
    update(customer, status) {
        if (customer.phone) {
            console.log(`SMS`);
            console.log(`To: ${customer.phone}`);
            console.log(`Message: Hello ${customer.name}, your package status has been updated to: "${status}". Thank you for choosing our service!`);
        }
    }
}

module.exports = SMSNotification;
