// server/server.js
const express = require('express');
const db = require('./config/db'); // Importing the singleton database connection

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Test Database Connection Route
app.get('/test-connection', async (req, res) => {
    try {
        await db.connect(); // Call the connect method from the Singleton
        res.status(200).send('Database connection is successful!');
    } catch (error) {
        console.error('Connection error:', error);
        res.status(500).send('Database connection failed!');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});