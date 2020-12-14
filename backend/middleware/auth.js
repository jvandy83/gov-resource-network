const { accessTokenSecret } = require('../config/keys');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  console.log('inside middleware');

  const authorization = req.get('Authorization');

  const token = authorization.split(' ')[1];

  console.log('token inside middleware', token);

  try {
    if (!token) {
      return res.status(403).json({
        message: 'User is not authorized.'
      });
    }
    const decoded = await jwt.verify(token, accessTokenSecret);
    if (!decoded) {
      return res.status(403).json({ message: 'User is not valid.' });
    }
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.error('died inside middleware!!!');
    next(err);
  }
};
