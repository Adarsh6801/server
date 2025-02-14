const { verifyToken } = require('../config/jwt');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    // Extract token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1]; // Format: "Bearer <token>"
    console.log(token,'token')

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify the token
    const decoded = verifyToken(token);
    if (!decoded || !decoded.user_id) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    console.log(decoded,'decoded')

    // Fetch the user from the database using the user_id from the token
    const user = await User.findOne({ user_id: decoded.user_id });
    console.log(user,'user')
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach the user object to the request for use in controllers
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = authMiddleware;