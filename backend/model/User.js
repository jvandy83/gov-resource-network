const mongoose = require('mongoose');

const User = require('./User');

const { Schema } = mongoose;

const userSchema = new Schema({
  isAppUser: Boolean,
  appUserId: String,
  firstName: String,
  lastName: String,
  email: String,
  email_verified: Boolean,
  family_name: String,
  given_name: String,
  locale: String,
  nickname: String,
  picture: String,
  sub: String,
  joinDate: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('User', userSchema);
