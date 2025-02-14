const cron = require('node-cron');
const Reminder = require('../models/Reminder');
const User = require('../models/User');
const admin = require('../config/firebase-admin');

// Function to send FCM notification
const sendFCMNotification = async (token, message) => {
  try {
    await admin.messaging().send({
      token: token,
      notification: {
        title: 'Reminder',
        body: message,
      },
    });
    console.log('Notification sent successfully:', token);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

// Function to check expiring reminders and send notifications
const checkExpiringReminders = async () => {
  try {
    const now = Date.now();
    const sevenDaysLater = now + 7 * 24 * 60 * 60 * 1000; // 7 days from now

    // Find reminders whose date is within the next 7 days
    const reminders = await Reminder.find({
      date: { $gte: now, $lte: sevenDaysLater },
    });
    console.log(reminders,'reminders');
    
    for (const reminder of reminders) {
      const daysRemaining = Math.floor((reminder.date - now) / (24 * 60 * 60 * 1000));
      console.log(daysRemaining,'daysRemaining');
      
      // Check if days remaining is one of 7, 6, 5, 4, 3, 2, 1
      if ([7, 6, 5, 4, 3, 2, 1].includes(daysRemaining)) {
        // Fetch the user's FCM token using the user_id from the reminder
        const user = await User.findById(reminder.user_id);

        if (user && user.device_info) {
          const message = `Your reminder "${reminder.title}" is due in ${daysRemaining} day(s).`;
          await sendFCMNotification(user.device_info.fcm, message);
        } else {
          console.error('User or FCM token not found for reminder:', reminder._id);
        }
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
});

cron.schedule('*/2 * * * *', () => {
    console.log('Running cron job every 2 minutes to check expiring reminders...');
    checkExpiringReminders();
  });
  