const Profile = require('../model/Profile');

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

// build intro object
const buildIntroObject = (data) => {
  const {
    firstName,
    lastName,
    currentPosition,
    photo,
    headline,
    industry,
    bio,
    city,
    state,
    country,
    postalCode
  } = data;

  // build location
  const locationObj = {};
  if (city) locationObj.city = city;
  if (state) locationObj.state = state;
  if (postalCode) locationObj.postalCode = postalCode;
  if (country) locationObj.country = country;
  // build main
  const intro = {};
  if (firstName) intro.firstName = firstName;
  if (lastName) intro.lastName = lastName;
  if (currentPosition) intro.currentPosition = currentPosition;
  if (photo) intro.photo = photo;
  if (industry) intro.industry = industry;
  if (headline) intro.headline = headline;
  if (bio) intro.bio = bio;
  // compose main object
  intro.location = locationObj;
  return {
    intro
  };
};

// build contact object
const buildContactObject = (data) => {
  const { website, phone, address, email, birthday } = data;
  const contact = {};

  if (website) contact.website = website;
  if (phone) contact.phone = phone;
  if (address) contact.address = address;
  if (email) contact.email = email;
  if (birthday) contact.birthday = birthday;
  return {
    contact
  };
};

// build background object

// build social object
const buildSocialObject = (data) => {
  const { twitter, linkedin, instagram } = data;
  const socialNetwork = {};

  if (twitter) socialNetwork.twitter = twitter;
  if (linkedin) socialNetwork.linkedin = linkedin;
  if (instagram) socialNetwork.instagram = instagram;
  return {
    socialNetwork
  };
};

// build accomplishments object

exports.addProfile = async (req, res, next) => {
  const body = req.body.data;

  const { auth_0_user, aboutMe } = body;

  const profileFields = {};

  const { intro } = buildIntroObject(body);
  const { contact } = buildContactObject(body);
  const { socialNetwork } = buildSocialObject(body);

  if (!isEmpty(intro)) profileFields.intro = intro;
  if (!isEmpty(contact)) profileFields.contact = contact;
  if (!isEmpty(socialNetwork)) profileFields.socialNetwork = socialNetwork;
  if (aboutMe) profileFields.aboutMe = aboutMe;

  try {
    // Check for existing Profile document
    const doc = await Profile.findOne({ auth_0_user: auth_0_user });

    if (doc) {
      doc.set(profileFields);

      await doc.save();

      return res.status(201).json({
        message: 'INTRO UPDATED!!!'
      });
    }
    const newProfile = new Profile({ ...profileFields, auth_0_user });

    await newProfile.save();

    res.status(200).json({
      message: 'Profile Created!!!'
    });
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};

exports.getProfile = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const profile = await Profile.findOne({ auth_0_user: userId });

    if (!profile) {
      return res.status(200).json({
        message: 'User not found'
      });
    }
    return res.status(200).json({
      message: 'Success!',
      card: profile
    });
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};
