const router = require('express').Router();

const { getAuth, signup, login } = require('../controllers/auth');

router.get('/me', getAuth);

router.post('/signup', signup);

router.post('/login', login);

module.exports = router;
