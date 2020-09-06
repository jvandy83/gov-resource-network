const Experience = require('../model/Background/Experience');

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const buildExperienceObject = (data) => {
  const {
    prevTitle,
    prevCompany,
    prevLocation,
    prevFrom,
    prevTo,
    prevDescription,
    currentJob
  } = data;

  // build experienceObj
  const expObj = {};

  if (prevTitle) expObj.prevTitle = prevTitle;
  if (prevCompany) expObj.prevCompany = prevCompany;
  if (prevLocation) expObj.prevLocation = prevLocation;
  if (prevFrom) expObj.prevFrom = prevFrom;
  if (prevTo) expObj.prevTo = prevTo;
  if (prevDescription) expObj.prevDescription = prevDescription;
  if (currentJob) expObj.currentJob = currentJob;

  return {
    expObj
  };
};

exports.addExperience = async (req, res, next) => {
  const body = req.body.data;

  const {
    auth_0_user,
    prevTitle,
    prevCompany,
    prevLocation,
    prevFrom,
    prevTo,
    prevDescription,
    currentJob
  } = body;

  try {
    const doc = await Experience.findOne({ auth_0_user: auth_0_user });

    if (doc) {
      const expArray = doc.experience;

      const { expObj } = buildExperienceObject(body);

      expArray.push(expObj);

      await doc.save();

      return res.status(201).json({
        message: 'Success, updated experience object!'
      });
    }
    // create new experience object
    const { expObj } = buildExperienceObject(body);

    const experience = [];
    experience.push(expObj);

    const newExperience = new Experience({ experience, auth_0_user });

    await newExperience.save();

    res.status(200).json({
      message: 'Success, new experience object created!'
    });
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};

exports.getExperience = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const experience = await Experience.findOne({ auth_0_user: userId });
    if (!experience) {
      return res.status(200).json({
        message: 'User not found'
      });
    }
    res.status(200).json({
      message: 'Success!',
      card: experience
    });
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};
