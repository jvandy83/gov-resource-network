const Accomplishments = require('../model/Accomplishments');

const buildAccomplishmentsObject = (data) => {
  const {
    publications,
    patents,
    courses,
    organizations,
    projects,
    languages
  } = data;

  const pubsArray = [];
  const patentsArray = [];
  const coursesArray = [];
  const projectsArray = [];
  const langsArray = [];
  const orgsArray = [];

  if (publications) pubsArray.push(publications);
  if (patents) patentsArray.push(patents);
  if (courses) coursesArray.push(courses);
  if (projects) projectsArray.push(projects);
  if (organizations) langsArray.push(organizations);
  if (languages) orgsArray.push(languages);

  const accomplishments = {
    publications: pubsArray,
    patents: patentsArray,
    courses: coursesArray,
    projects: projectsArray,
    organizations: orgsArray,
    languages: langsArray
  };

  return {
    accomplishments
  };
};

exports.addAccomplishments = async (req, res, next) => {
  const body = req.body.data;

  const { user_id } = req.body.data;

  const {
    publications,
    patents,
    courses,
    projects,
    organizations,
    languages
  } = body;

  try {
    const doc = await Accomplishments.findOne({ user_id: user_id });

    if (doc) {
      const accomp = doc.accomplishments;

      if (publications) accomp.publications.push(publications);
      if (patents) accomp.patents.push(patents);
      if (courses) accomp.courses.push(courses);
      if (projects) accomp.projects.push(projects);
      if (organizations) accomp.organizations.push(organizations);
      if (languages) accomp.languages.push(languages);

      await doc.save();

      res.status(201).json({
        message: 'UPDATED ACCOMPLISHMENTS'
      });
    } else {
      const { accomplishments } = buildAccomplishmentsObject(body);
      const mainObj = { accomplishments, user_id };
      const newAccomplishments = await new Accomplishments(mainObj);
      await newAccomplishments.save();

      res.status(200).json({
        message: 'NEW ACCOMPLISHMENTS CREATED',
        result: newAccomplishments
      });
    }
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};

exports.getAccomplishments = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const accomplishments = await Accomplishments.findOne({
      user_id: userId
    });
    if (!accomplishments) {
      return res.status(200).json({
        message: 'User could not be found'
      });
    }
    res.status(200).json({
      message: 'Success!',
      card: accomplishments
    });
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};
