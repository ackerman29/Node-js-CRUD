const User = require('../model/usermodel.js');     
const bcrypt = require('bcryptjs');    
const jwt = require('jsonwebtoken'); 


const register = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;  

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' }); 
    }

    const hashedPassword = await bcrypt.hash(password, 10);  

    const newUser = new User({
      name,
      email,
      password: hashedPassword,  
      age
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Register failed', details: err.message });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Step 1: Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password); 
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id },                
      process.env.JWT_SECRET,         
      { expiresIn: '1h' }             
    );

    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};

module.exports = { register,login };
