const express = require('express');
const { isAuthenticated, isAuthorized } = require('../middleware/auth'); // Adjust the path as necessary
const router = express.Router();

// A protected route that requires authentication
router.get('/dashboard', isAuthenticated, (req, res) => {
    res.send('Welcome to your dashboard, ' + req.user.name);
});

// A route that requires the user to be an admin
router.delete('/user/:id', isAuthenticated, isAuthorized('admin'), (req, res) => {
    res.send('User deleted successfully');
});

module.exports = router;
