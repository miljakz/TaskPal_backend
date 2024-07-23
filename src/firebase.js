const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json'); // Path to the downloaded service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
