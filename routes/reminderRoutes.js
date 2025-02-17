const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminderController');
const { reminderValidationRules } = require('../validators/reminderValidators');
const { validationResult } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


// Apply validation rules to the route
router.post(
    '/save_reminder',
    reminderValidationRules, // Validation rules
    handleValidationErrors,
    authMiddleware, // Handle validation errors
    reminderController.saveReminder // Controller
  );
  router.get(
    '/all_reminders',
    authMiddleware,
    reminderController.getReminders // Controller
  );
  router.delete(
    '/delete_reminders',
    authMiddleware,
    reminderController.deleteReminders // Controller
  );

module.exports = router;