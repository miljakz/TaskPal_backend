const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://task-e1b5f.firebaseio.com' 
});

module.exports = admin;
