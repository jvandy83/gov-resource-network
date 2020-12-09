const router = require('express').Router();

const { addExperience, getExperience } = require('../controllers/Experience');

const { addEducation, getEducation } = require('../controllers/education');

const {
  addAccomplishments,
  getAccomplishments
} = require('../controllers/accomplishments');

const { getProfile, addProfile } = require('../controllers/profile');

router.get('/profile/:id', getProfile);
router.put('/profile', addProfile);

router.get('/education/:id', getEducation);
router.put('/education', addEducation);

router.get('/experience/:id', getExperience);
router.put('/experience', addExperience);

router.get('/accomplishments/:id', getAccomplishments);
router.put('/accomplishments', addAccomplishments);

module.exports = router;
