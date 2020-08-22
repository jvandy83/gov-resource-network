const mongoose = require('mongoose');

const User = require('./User');

const { Schema } = mongoose;

const profileSchema = new Schema({
  user_id: String,
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  location: {
    city: String,
    state: String
  },
  bio: String,
  jobTitle: {
    type: String
  },
  industry: {
    type: String
  },
  experience: {
    previousTitle: {
      type: String
    },
    company: {
      type: String
    },
    location: String,
    previousFromDate: Date,
    previousToDate: Date,
    currentJob: {
      type: String,
      default: 'notCurrentJob'
    },
    previousJobDescription: String
  },
  education: {
    school: {
      type: String
    },
    degree: {
      type: String
    },
    fieldOfStudy: {
      type: String
    },
    schoolFrom: Date,
    schoolTo: Date
  },
  social: {
    linkedin: String,
    twitter: String,
    instagram: String
  },
  joinDate: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Profile', profileSchema);

profileSchema.pre('save', function (next) {
  this.firstName =
    this.name.trim()[0].toUpperCase() + this.name.slice(1).toLowerCase();
  this.name =
    this.lastName.trim()[0].toUpperCase() + this.name.slice(1).toLowerCase();
  next();
});

profileSchema.post('remove', { document: true, query: false }, (doc, next) => {
  console.log(doc);
  const userId = doc.user._id;
  User.findByIdAndDelete(userId).then((result) => {
    console.log('user has been removed');
  });
  next();
});
