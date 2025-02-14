const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');
const { generateToken } = require('../config/jwt');
// Create a new user

exports.createUserId = async (req, res) => {
    try {
      const { first_name,last_name, email, password,device_type,device_token,device_maker,fcm } = req.body;
  
      // Function to generate a unique user_id
      const generateUniqueUserId = async () => {
        let isUnique = false;
        let user_id;
  
        // Keep generating until a unique user_id is found
        while (!isUnique) {
          user_id = uuidv4(); // Generate a UUID
          const existingUser = await User.findOne({ user_id }); // Check if user_id exists
          if (!existingUser) {
            isUnique = true; // If not found, the user_id is unique
          }
        }
  
        return user_id;
      };
      const user_id = await generateUniqueUserId();
      const payload = {
        user_id: user_id,
      };
      const token = generateToken(payload);
      // Generate a unique user_id

      const device_info = {
        jwt_token:token,
        device_type,
        device_token,
        device_maker,
        fcm,
      };
  
      if(first_name,last_name,email,password){
          // Create a new user with the unique user_id
          const user = new User({ user_id, name, email, password,device_info });
          await user.save();
      }else{
        const user= new User({user_id:user_id,device_info})
        await user.save();

      }

      // Send response
      res.status(201).json({ message: 'User created successfully', token:token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };