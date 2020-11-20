const Education = require('../model/Background/Education');

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const buildEducationObject = (data) => {
  const { school, degree, fieldOfStudy, schoolFrom, schoolTo } = data;
  // build educationObject
  const eduObj = {};

  if (school) eduObj.school = school;
  if (degree) eduObj.degree = degree;
  if (fieldOfStudy) eduObj.fieldOfStudy = fieldOfStudy;
  if (schoolFrom) eduObj.schoolFrom = schoolFrom;
  if (schoolTo) eduObj.schoolTo = schoolTo;

  return {
    eduObj
  };
};

exports.addEducation = async (req, res, next) => {
  console.log('inside education handler');
  const body = req.body.data;

  const {
    auth_0_user,
    school,
    degree,
    fieldOfStudy,
    schoolFrom,
    schoolTo
  } = body;

  try {
    console.log('inside try block');
    const doc = await Education.findOne({ auth_0_user: auth_0_user });

    if (doc) {
      const eduArray = doc.education;

      const { eduObj } = buildEducationObject(body);

      // add education object to existing eduction array
      eduArray.push(eduObj);

      await doc.save();

      res.status(201).json({
        message: 'Education object has been updated/added to'
      });
    } else {
      console.log('inside else block');
      const { eduObj } = buildEducationObject(body);

      const education = [];
      education.push(eduObj);

      const newEducation = new Education({ education, auth_0_user });

      await newEducation.save();
    }
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};

exports.getEducation = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const education = await Education.findOne({ auth_0_user: userId });

    if (!education) {
      return res.status(200).json({
        message: 'User could not be found'
      });
    }
    res.status(200).json({
      message: 'Success!',
      card: education
    });
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};
