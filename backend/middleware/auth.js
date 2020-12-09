const { jwtSecret } = require('../config/keys');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  console.log('inside middleware');
  const token = req.header['x-auth-token'];
  if (!token) {
    return res.status(403).json({
      message: 'User is not authorized.'
    });
  }
  try {
    const decoded = await jwt.verify(token, jwtSecret);
    if (!decoded) {
      return res.status(403).json({ message: 'User is not valid.' });
    }
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error('died inside middleware!!!');
  }
};
