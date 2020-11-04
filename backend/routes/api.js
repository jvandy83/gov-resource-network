const { addProfile, getProfile } = require('../controllers/Profile');

const { addExperience, getExperience } = require('../controllers/Experience');

const { addEducation, getEducation } = require('../controllers/Education');

const {
  addAccomplishments,
  getAccomplishments
} = require('../controllers/Accomplishments');

const router = require('express').Router();

router.get('/profile/:id', getProfile);
router.get('/education/:id', getEducation);
router.get('/experience/:id', getExperience);
router.get('/accomplishments/:id', getAccomplishments);

router.put('/profile', addProfile);
router.put('/education', addEducation);
router.put('/experience', addExperience);
router.put('/accomplishments', addAccomplishments);

module.exports = router;
