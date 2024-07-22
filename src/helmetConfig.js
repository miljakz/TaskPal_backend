const helmet = require('helmet');

const helmetConfig = helmet({
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            "default-src": ["'self'"],
            "script-src": ["'self'", "'unsafe-inline'"],
            "style-src": ["'self'", "'unsafe-inline'"],
            "img-src": ["'self'", "data:"],
            "connect-src": ["'self'"],
            "font-src": ["'self'", "https:", "data:"],
        },
    },
    referrerPolicy: { policy: 'no-referrer' },
    featurePolicy: {
        features: {
            geolocation: ["'none'"],
            midi: ["'none'"],
            notifications: ["'none'"],
            push: ["'none'"],
            syncXhr: ["'none'"],
            microphone: ["'none'"],
            camera: ["'none'"],
            magnetometer: ["'none'"],
            gyroscope: ["'none'"],
            speaker: ["'none'"],
            vibrate: ["'none'"],
            fullscreen: ["'self'"],
            payment: ["'none'"],
        },
    },
    dnsPrefetchControl: { allow: false },
    expectCt: {
        enforce: true,
        maxAge: 30,
    },
    frameguard: { action: 'deny' },
    hidePoweredBy: true,
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
    },
    ieNoOpen: true,
    noSniff: true,
    permittedCrossDomainPolicies: { policy: 'none' },
    xssFilter: true,
});

module.exports = helmetConfig;
