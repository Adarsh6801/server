const mongoose = require('mongoose');

// Define a nested schema for device information
const deviceInfoSchema = new mongoose.Schema({
  jwt_token: {
    type: String,
    required: true,
  },
  device_type: {
    type: String,
    required: true,
  },
  device_token: {
    type: String,
    required: true,
  },
  device_maker: {
    type: String,
    required: true,
  },
  fcm: {
    type: String,
    required: true,
  },
});

// Define the main user schema
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    // required: true,
  },
  last_name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
    // unique: true,
  },
  password: {
    type: String,
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  fcmToken: {
    type: String,
  },
  device_info: deviceInfoSchema, // Array of device information objects
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;