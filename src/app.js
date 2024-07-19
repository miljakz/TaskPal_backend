const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const secureRoutes = require('./routes/secureRoutes'); 

const app = express();

// Environment configuration
require('dotenv').config();

// Middleware
app.use(cors()); // Enables CORS
app.use(helmet()); // Helps secure your apps by setting various HTTP headers
app.use(morgan('dev')); // Logging middleware
app.use(bodyParser.json()); // Parses JSON data in requests
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded data

app.use(express.static('public'));

// Routes
app.use('/api', secureRoutes); // Secure routes

app.get('/', (req, res) => {
    res.send('Welcome to the TaskPal API!');
});

// Basic error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
