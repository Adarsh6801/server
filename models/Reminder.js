const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  date: {
    type: Number,
    required: true,
  },
  user_id:{
    type: mongoose.Types.ObjectId,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  recurring: {
    type: String, // Example: "Yearly", "Monthly", "Weekly"
    required: true,
  },
  amount: {
    type: Number,
  },
  policyNumber: {
    type: String,
  },
  policyProvider: {
    type: String,
  },
  vehicleNumber: {
    type: String,
  },
  vehicleType: {
    type: String,
  },
  accountNumber: {
    type: String,
  },
  lenderName: {
    type: String,
  },
  description: {
    type: String,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Reminder', reminderSchema);
