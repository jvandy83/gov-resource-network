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

      res.status(201).json({
        message: 'Success, updated experience object!'
      });
    } else {
      console.log('inside new block');
      // create new experience object
      const { expObj } = buildExperienceObject(body);

      const experience = [];
      experience.push(expObj);

      const newExperience = await new Experience({ experience, auth_0_user });

      await newExperience.save();

      res.status(200).json({
        message: 'Success, new experience object created!'
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Server error, ${err.message}`
    });
  }
};

exports.getExperience = (req, res, next) => {
  const userId = req.params.id;

  Experience.findOne({ auth_0_user: userId })
    .then((exp) => {
      if (!exp) {
        res.status(200).json({
          message: 'User not found'
        });
      } else {
        res.status(200).json({
          message: 'Success!',
          exp
        });
      }
    })
    .catch((err) => console.error(err.message));
};
