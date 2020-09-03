const mongoose = require('mongoose');

const User = require('./User');

const { Schema } = mongoose;

const profileSchema = new Schema({
  mongo_user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  auth_0_user: String,
  intro: {
    firstName: String,
    lastName: String,
    currentPosition: String,
    headline: String,
    photo: String,
    industry: String,
    bio: String,
    location: {
      city: String,
      state: String,
      country: String,
      postalCode: String
    }
  },
  aboutMe: String,
  contact: {
    website: String,
    phone: String,
    address: String,
    email: String,
    birthday: String
  },
  socialNetwork: {
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
  console.log('PRE-SAVE RAN!!!');
  this.firstName =
    this.name.trim()[0].toUpperCase() + this.name.slice(1).toLowerCase();
  this.name =
    this.lastName.trim()[0].toUpperCase() + this.name.slice(1).toLowerCase();
  next();
});

profileSchema.post('remove', { document: true, query: false }, (doc, next) => {
  console.log(doc);
  const userId = doc.user_id;
  User.findByIdAndDelete(userId).then((result) => {
    console.log('user has been removed');
  });
  next();
});
