const cron = require('node-cron');
const Reminder = require('../models/Reminder');
const User = require('../models/User');
const admin = require('../config/firebase-admin');

// Function to send FCM notification
const sendFCMNotification = async (token,message, reminder) => {
  try {
    await admin.messaging().send({
      token: token,
      notification: {
        title: 'Reminder',
        body: message,
      },
      data: {
        _id: reminder._id.toString(),
        title: reminder.title,
        description: reminder.description || '',
        date: reminder.date.toString(),
        user_id: reminder.user_id.toString(),
        subCategory:reminder.subCategory.toString(),
        category:reminder.category.toString(),
        recurring:reminder.recurring.toString(),
        amount:reminder.amount.toString(),
        policyNumber:reminder.policyNumber.toString(),
        policyProvider:reminder.policyProvider.toString(),
        vehicleNumber:reminder.vehicleNumber.toString(),
        vehicleType:reminder.vehicleType.toString(),
        accountNumber:reminder.accountNumber.toString(),
        lenderName:reminder.lenderName.toString(),
        description:reminder.description.toString(),
        isPaid:reminder.isPaid.toString()
      },
    });
    console.log('Notification sent successfully:', token);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

// Function to send FCM notification
const sendSMSNotification = async (token,reminder,message) => {
  try {
    await admin.messaging().send({
      token: token,
      notification: {
        title: 'Overdue',
        body: message,
      },
      data: {
        _id: reminder._id.toString(),
        title: reminder.title,
        description: reminder.description || '',
        date: reminder.date.toString(),
        user_id: reminder.user_id.toString(),
        subCategory:reminder.subCategory.toString(),
        category:reminder.category.toString(),
        recurring:reminder.recurring.toString(),
        amount:reminder.amount.toString(),
        policyNumber:reminder.policyNumber.toString(),
        policyProvider:reminder.policyProvider.toString(),
        vehicleNumber:reminder.vehicleNumber.toString(),
        vehicleType:reminder.vehicleType.toString(),
        accountNumber:reminder.accountNumber.toString(),
        lenderName:reminder.lenderName.toString(),
        description:reminder.description.toString(),
        isPaid:reminder.isPaid.toString()
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
    const thirtyDaysLater = now + 30 * 24 * 60 * 60 * 1000;
    // Find reminders whose date is within the next 7 days
    const reminders = await Reminder.find({
      date: { $gte: now, $lte: thirtyDaysLater },
    });
    console.log(reminders, 'reminders');

    for (const reminder of reminders) {
      const timeDiff = reminder.date - now;
      const daysRemaining = Math.ceil(timeDiff / (24 * 60 * 60 * 1000)); // Use Math.ceil()

      console.log(daysRemaining, 'daysRemaining');

      // Check if days remaining is within the desired range
      if ([30, 15, 7, 6, 5, 4, 3, 2, 1].includes(daysRemaining)) {
        // Fetch the user's FCM token using the user_id from the reminder
        const user = await User.findById(reminder.user_id);

        if (user && user.device_info) {
          const message = `"${reminder.title}" is due in ${daysRemaining} day(s).`;
          await sendFCMNotification(user.device_info.fcm, message, reminder);
        } else {
          console.error('User or FCM token not found for reminder:', reminder._id);
        }
      }
    }
  } catch (error) {
    console.error('Error checking expiring reminders:', error);
  }
};

const checkOverdueReminders = async () => {
  try {
    const now = Date.now();

    // Find reminders with a date in the past (overdue)
    const overdueReminders = await Reminder.find({
      date: { $lt: now }, // Date is less than the current date (overdue)
    });

    console.log(overdueReminders, 'overdueReminders');

    for (const reminder of overdueReminders) {
      const timeDiff = now - reminder.date;
      const daysOverdue = Math.floor(timeDiff / (24 * 60 * 60 * 1000)); // Use Math.floor() to avoid counting extra days

      console.log(daysOverdue, 'daysOverdue');

      // Fetch the user's phone number using the user_id from the reminder
      const user = await User.findById(reminder.user_id);
      console.log(user, 'useruser');

      if (user && user.device_info) {
        const message = `"${reminder.title}" is overdue by ${daysOverdue} day(s). Please take action.`;

        await sendSMSNotification(user.device_info.fcm, reminder, message);
      } else {
        console.error('User or phone number not found for overdue reminder:', reminder._id);
      }
    }
  } catch (error) {
    console.error('Error checking overdue reminders:', error);
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