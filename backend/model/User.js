const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  user_id: String,
  email: String,
  password: String,
  client_id: String,
  connection: String,
  request_language: String,
  tenant: String
});

module.exports = mongoose.model('User', userSchema);
