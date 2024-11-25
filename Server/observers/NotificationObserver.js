class NotificationObserver { // OBSERVER INTERFACE
    update(customer, status) {
        throw new Error("Method 'update()' must be implemented.");
    }
}

module.exports = NotificationObserver;
