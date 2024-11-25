const NotificationObserver = require('./NotificationObserver');

class EmailNotification extends NotificationObserver {
    update(customer, status) {
        if (customer.email) {
            console.log(`Email`);
            console.log(`Subject: Package Status Update`);
            console.log(`Dear ${customer.name},`);
            console.log(`Your package status is now: "${status}".`);
            console.log(`Thank you for using our service!`);
            console.log(`Best,\nBlue Bolt Team`);
        }
    }
}

module.exports = EmailNotification;
