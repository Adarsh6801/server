const cron = require('node-cron');
const Reminder = require('../models/Reminder');
const User = require('../models/User');
const admin = require('../config/firebase-admin');

// Function to send FCM notification
const sendFCMNotification = async (token, message, user_id) => {
    try {
      await admin.messaging().send({
        token: token,
        notification: {
          title: 'Owl Manager',
          body: message,
        },
        data: {},
      });
      console.log('Notification sent successfully:', token);
    } catch (error) {
      console.error('Error sending notification:', error);
  
      // Check if error is due to an invalid token
      if (error.code === 'messaging/registration-token-not-registered') {
        console.log(`Invalid token detected. Deleting user ${user_id}`);
  
        // Delete the user from the database
        await User.findByIdAndDelete(user_id);
      }
    }
  };
  
  // Function to check expiring reminders and send notifications
  const checkExpiringReminders = async () => {
    try {
      const allUsers = await User.find();
      for (const user of allUsers) {
        if (user && user.device_info?.fcm) {
          const message = `Don't forget to mark your transaction today!`;
          await sendFCMNotification(user.device_info.fcm, message, user._id);
        }
      }
    } catch (error) {
      console.error('Error checking expiring reminders:', error);
    }
  };
  



// Schedule the cron job to run daily at 8:00 AM
cron.schedule('0 8 * * *', () => {
  console.log('Running cron job to check expiring reminders...');
  checkExpiringReminders();
checkOverdueReminders();

});

cron.schedule('*/2 * * * *', () => {
    console.log('Running cron job every 2 minutes to check expiring reminders...');
    checkExpiringReminders();
    checkOverdueReminders();
  });



//   cron.schedule('*/10 * * * * *', () => {
//     console.log('Running cron job every 10 seconds to check expiring reminders...');
//     checkExpiringReminders();
// checkOverdueReminders();

// });