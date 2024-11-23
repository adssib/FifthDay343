const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const deliveryRoutes = require('./routes/deliveryRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// API routes
app.use('/api', deliveryRoutes);
app.use('/api/payment', paymentRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});