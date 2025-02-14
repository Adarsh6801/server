const { body } = require('express-validator');

// Validation rules for creating a user
const createUserValidationRules = [
  // Validate first_name (optional)
  body('first_name').optional().isString().withMessage('First name must be a string'),

  // Validate last_name (optional)
  body('last_name').optional().isString().withMessage('Last name must be a string'),

  // Validate email (optional but must be a valid email if provided)
  body('email').optional().isEmail().withMessage('Invalid email address'),

  // Validate password (optional)
  body('password').optional().isString().withMessage('Password must be a string'),

  // Validate device_type (required)
  body('device_type')
    .notEmpty()
    .withMessage('Device type is required')
    .isString()
    .withMessage('Device type must be a string'),

  // Validate device_token (required)
  body('device_token')
    .notEmpty()
    .withMessage('Device token is required')
    .isString()
    .withMessage('Device token must be a string'),

  // Validate device_maker (required)
  body('device_maker')
    .notEmpty()
    .withMessage('Device maker is required')
    .isString()
    .withMessage('Device maker must be a string'),

  // Validate fcm (required)
  body('fcm')
    .notEmpty()
    .withMessage('FCM token is required')
    .isString()
    .withMessage('FCM token must be a string'),
];

module.exports = {
  createUserValidationRules,
};