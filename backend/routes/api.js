const { addProfile, getProfile } = require('../controllers/Profile');

const { addExperience, getExperience } = require('../controllers/Experience');

const { addEducation, getEducation } = require('../controllers/Education');

const { addAccomplishments } = require('../controllers/Accomplishments');

const router = require('express').Router();

router.get('/profile/:id', getProfile);
router.get('/education/:id', getEducation);
router.get('/experience/:id', getExperience);
// router.get('/user/accomplishments/:id', getAccomplishments);

router.put('/profile', addProfile);
router.put('/experience', addExperience);
router.put('/education', addEducation);
router.put('/accomplishments', addAccomplishments);

module.exports = router;
