const router = require('express').Router();

const {
  getAuth,
  signup,
  login,
  postRefreshToken
} = require('../controllers/auth');

const auth = require('../middleware/auth');

router.get('/me', auth, getAuth);

router.post('/signup', signup);

router.post('/login', login);

router.post('/refresh_token', postRefreshToken);

module.exports = router;
