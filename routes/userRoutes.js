const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { createUserValidationRules } = require('../validators/userValidators');
const { validationResult } = require('express-validator');

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
  '/create_userid',
  createUserValidationRules, // Validation rules
  handleValidationErrors, // Handle validation errors
  userController.createUserId // Controller
);

module.exports = router;