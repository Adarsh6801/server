const admin = require('firebase-admin');
const serviceAccount = require('../src/assets/file/owl-manager-adb55-firebase-adminsdk-fbsvc-16800aede8.json'); // Download from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;