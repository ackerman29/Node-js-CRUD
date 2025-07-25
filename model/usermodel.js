const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
  name: {
    type: String,
    required: true,   
  },
  email: {
    type: String,
    required: true,
    unique: true,     
  },
  age: {
    type: Number,
    required: false,  
  },
  password: {
    type: String,
    required: true,   // Password is required now
  }
}, { timestamps: true }); 

module.exports = mongoose.model('User', userSchema);