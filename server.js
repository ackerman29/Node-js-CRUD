const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

const useroutes = require('./routes/userRoutes'); 

const app = express();

dotenv.config();
console.log('URI from .env:', process.env.MONGO_URI);
app.use(express.json());
app.use('/users', useroutes);
app.use('/auth', authRoutes);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected ');

  app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
  });
})
.catch(err => {
  console.log('MongoDB connection failed :', err.message);
});
