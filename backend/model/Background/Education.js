const mongoose = require('mongoose');

const { Schema } = mongoose;

const educationSchema = new Schema({
  auth_0_user: String,
  mongo_user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  education: [
    {
      school: String,
      degree: String,
      fieldOfStudy: String,
      schoolFrom: Date,
      schoolTo: Date
    }
  ]
});

module.exports = mongoose.model('Education', educationSchema);
