const mongoose = require('mongoose');

const User = require('./User');

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  avatar: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  joinDate: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('User', userSchema);
