const Profile = require('../model/Profile');

const User = require('../model/User');

exports.postProfile = (req, res, next) => {
  const {
    user_id,
    firstName,
    lastName,
    email,
    gender,
    bio,
    jobTitle,
    industry,
    // start experience object
    previousTitle,
    company,
    location,
    previousFromDate,
    previousToDate,
    currentJob,
    previousJobDescription,
    // start education object
    school,
    degree,
    fieldOfStudy,
    schoolFrom,
    schoolTo,
    // start social
    twitter,
    linkedin,
    instagram
  } = req.body.data;
  const experienceFields = {};
  const educationFields = {};
  const socialFields = {};
  // build experience object
  if (previousTitle) experienceFields.previousTitle = previousTitle;
  if (company) experienceFields.company = company;
  if (location) experienceFields.location = location;
  if (previousFromDate) experienceFields.previousFromDate = previousFromDate;
  if (previousToDate) experienceFields.previousToDate = previousToDate;
  if (currentJob) experienceFields.currentJob = currentJob;
  if (previousJobDescription)
    experienceFields.previousJobDescription = previousJobDescription;
  // build education object
  if (school) educationFields.school = school;
  if (degree) educationFields.degree = degree;
  if (fieldOfStudy) educationFields.fieldOfStudy = fieldOfStudy;
  if (schoolFrom) educationFields.schoolFrom = schoolFrom;
  if (schoolTo) educationFields.schoolTo = schoolTo;
  // build social object
  if (twitter) socialFields.twitter = twitter;
  if (linkedin) socialFields.linkedin = linkedin;
  if (instagram) socialFields.instagram = instagram;
  const profileFields = {
    user_id,
    firstName,
    lastName,
    email,
    gender,
    bio,
    jobTitle,
    industry,
    experience: experienceFields,
    education: educationFields,
    social: socialFields
  };
  Profile.findOne({ user_id: user_id })
    .then((profile) => {
      if (profile) {
        console.log(profile);
        // Profile.findOneAndUpdate(
        //   { user_id: user_id },
        //   { $set: profileFields },
        //   { new: true }
        // )
        profile.set(profileFields);
        // .then((result) => {
        //   console.log('PROFILE UPDATED!!!');
        // })
        profile
          .save()
          .then((result) => {
            console.log('PROFILE CREATED!!!');
            return res.status(200).json({
              success: true
            });
          })
          .catch((err) => console.error(err.message));
      } else {
        const newProfile = new Profile(profileFields);
        newProfile
          .save()
          .then((result) => {
            console.log('PROFILE CREATED!!!');
            return res.status(200).json({
              success: true
            });
          })
          .catch((err) => console.error(err.message));
      }
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send('Server Error');
    });
};

exports.getProfile = (req, res, next) => {
  const userId = req.params.id;

  Profile.findOne({ user_id: userId })
    .then((profile) => {
      if (!profile) {
        res.status(200).json({
          message: 'User not found'
        });
      } else {
        res.status(200).json({
          message: 'Success!',
          profile
        });
      }
    })
    .catch((err) => console.error(err.message));
};
