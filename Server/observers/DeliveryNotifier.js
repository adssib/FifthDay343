class DeliveryNotifier {
    constructor() {
        this.observers = [];
    }

    attach(observer) {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
        }
    }

    detach(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notifyObservers(customer, status) {
        this.observers.forEach(observer => {
            try {
                observer.update(customer, status);
            } catch (error) {
                console.error(`Error notifying observer: ${error.message}`);
            }
        });
    }
}

module.exports = DeliveryNotifier;
