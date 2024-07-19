const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated
exports.isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is sent as a Bearer token
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add decoded user info to the request object
        next();
    } catch (ex) {
        res.status(400).json({ message: "Invalid token." });
    }
};

// Middleware to check if the user has a specific role
exports.isAuthorized = (role) => {
    return (req, res, next) => {
        if (!req.user.roles.includes(role)) {
            return res.status(403).json({ message: "Access denied. You do not have the right permissions." });
        }
        next();
    };
};
