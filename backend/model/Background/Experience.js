const mongoose = require('mongoose');

const { Schema } = mongoose;

const experienceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
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
