// server/config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

class DatabaseConnection {
    static instance = null;

    constructor() {
        if (DatabaseConnection.instance) {
            return DatabaseConnection.instance;
        }

        DatabaseConnection.instance = this;
        this.connection = null; // Initialize connection here
    }

    async connect() {
        if (!this.connection) {
            try {
                this.connection = await mongoose.connect(process.env.MONGO_URI, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });
                console.log('MongoDB connected successfully');
            } catch (error) {
                console.error('MongoDB connection error:', error);
                process.exit(1); // Exit the application on error
            }
        }
        return this.connection;
    }
}

const dbInstance = new DatabaseConnection();
Object.freeze(dbInstance); // Prevent modifications
module.exports = dbInstance;