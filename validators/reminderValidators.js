const { body } = require('express-validator');

// Validation rules for creating a reminder
const reminderValidationRules = [
  // Validate date (required, timestamp format)
  body('date')
    .notEmpty()
    .withMessage('Date is required')
    .isNumeric()
    .withMessage('Date must be a valid timestamp'),

  // Validate subCategory (required)
  body('subCategory')
    .notEmpty()
    .withMessage('Subcategory is required')
    .isString()
    .withMessage('Subcategory must be a string'),

  // Validate category (required)
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isString()
    .withMessage('Category must be a string'),

  // Validate title (required)
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string'),

  // Validate recurring (required)
  body('recurring')
    .notEmpty()
    .withMessage('Recurring is required')
    .isString()
    .withMessage('Recurring must be a string'),

  // Validate amount (optional)
  body('amount').optional().isNumeric().withMessage('Amount must be a number'),

  // Validate amount (optional)
  body('id').optional().isString().withMessage('id must be a string'),

  // Validate policyNumber (optional)
  body('policyNumber').optional().isString().withMessage('Policy number must be a string'),

  // Validate policyProvider (optional)
  body('policyProvider').optional().isString().withMessage('Policy provider must be a string'),

  // Validate vehicleNumber (optional)
  body('vehicleNumber').optional().isString().withMessage('Vehicle number must be a string'),

  // Validate vehicleType (optional)
  body('vehicleType').optional().isString().withMessage('Vehicle type must be a string'),

  // Validate accountNumber (optional)
  body('accountNumber').optional().isString().withMessage('Account number must be a string'),

  // Validate lenderName (optional)
  body('lenderName').optional().isString().withMessage('Lender name must be a string'),

  // Validate description (optional)
  body('description').optional().isString().withMessage('Description must be a string'),

  // Validate isPaid (optional, boolean)
  body('isPaid').optional().isBoolean().withMessage('isPaid must be a boolean'),
];

module.exports = {
    reminderValidationRules,
};
