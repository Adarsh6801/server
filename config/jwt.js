const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// JWT secret key (store this in your .env file)
const JWT_SECRET = process.env.JWT_SECRET || 'your_default_jwt_secret_key';

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET);
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = { generateToken, verifyToken };