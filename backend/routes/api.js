const { addProfile, getProfile } = require('../controllers/Profile');

const { addExperience, getExperience } = require('../controllers/Experience');

const { addEducation, getEducation } = require('../controllers/Education');

const { createNewUser, getAppUser } = require('../controllers/Auth');

const {
  addAccomplishments,
  getAccomplishments
} = require('../controllers/Accomplishments');

const router = require('express').Router();

// refactor routes as needed
// in seperate files

router.get('/experience/:id', getExperience);
router.put('/experience', addExperience);

router.get('/accomplishments/:id', getAccomplishments);
router.put('/accomplishments', addAccomplishments);

router.get('/education/:id', getEducation);
router.put('/education', addEducation);

router.get('/profile/:id', getProfile);
router.put('/profile', addProfile);

router.post('/profile/register', createNewUser);

router.get('/auth/me/:id', getAppUser);

module.exports = router;
