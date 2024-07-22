const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const secureRoutes = require('./routes/secureRoutes'); 

const app = express();

// Environment configuration
dotenv.config();

// Middleware
app.use(cors());
app.use(helmet()); 
app.use(morgan('dev')); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

// Serve static files
app.use(express.static('public'));

// Routes
app.use('/api', secureRoutes); // Secure routes

// Welcome route
app.get('/', (req, res) => {
    res.send('Welcome to the TaskPal API!');
});

// 404 handler
app.use((req, res, next) => {
    res.status(404).send('Not Found');
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
