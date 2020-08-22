const { postProfile, getProfile } = require('../controllers/Profile');

const { register } = require('../controllers/Auth');

const router = require('express').Router();

router.get('/profile/:id', getProfile);

router.put('/profile', postProfile);

router.post('/register', register);

module.exports = router;
