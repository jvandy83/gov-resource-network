const mongoose = require('mongoose');

const { Schema } = mongoose;

const accomplishmentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  accomplishments: {
    patents: [String],
    projects: [String],
    courses: [String],
    organizations: [String],
    languages: [String],
    publications: [String]
  }
});

module.exports = mongoose.model('Accomplishment', accomplishmentSchema);
