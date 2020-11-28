const mongoose = require('mongoose');

const { Schema } = mongoose;

const experienceSchema = new Schema({
  appUserId: String,
  experience: [
    {
      prevTitle: String,
      prevCompany: String,
      prevLocation: String,
      prevFromDate: Date,
      prevToDate: Date,
      prevDescription: String,
      currentJob: {
        type: String,
        default: 'notCurrentJob'
      }
    }
  ]
});

module.exports = mongoose.model('Experience', experienceSchema);
