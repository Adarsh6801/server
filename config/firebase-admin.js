const admin = require('firebase-admin');
const serviceAccount = require('../src/assets/file/owl-manager-adb55-firebase-adminsdk-fbsvc-321be964ac.json'); // Download from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;