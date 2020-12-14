const { sign } = require('jsonwebtoken');
const { accessTokenSecret, refreshTokenSecret } = require('../../config/keys');

exports.createAccessToken = (user) => {
  console.log('user inside createAccessToken', user);
  return sign(
    {
      userId: user._id.toString()
    },
    accessTokenSecret,
    { expiresIn: '15m' }
  );
};

exports.createRefreshToken = (user) => {
  console.log('user inside createRefreshToken', user);
  return sign(
    {
      userId: user._id.toString(),
      tokenVersion: user.tokenVersion
    },
    refreshTokenSecret,
    {
      expiresIn: '7d'
    }
  );
};

exports.sendRefreshToken = (res, token) => {
  console.log('inside sendRefreshToken');
  return res.cookie('jid', token, {
    httpOnly: true
  });
};
