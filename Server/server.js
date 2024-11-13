// server/server.js
const express = require('express');
const db = require('./config/db'); // Importing the singleton database connection
const cors = require('cors');
const bodyParser = require('body-parser');
const deliveryRoutes = require('./routes/deliveryRoutes'); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: true })); 

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

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

// API routes
app.use('/api', deliveryRoutes); 

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});