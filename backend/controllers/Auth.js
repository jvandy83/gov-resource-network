const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const { jwtSecret } = require('../../client/src/config');
const { validationResult } = require('express-validator');
const gravatar = require('gravatar');

const { accessTokenSecret, refreshTokenSecret } = require('../config/keys');

const {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken
} = require('../util/auth/auth');

exports.getAuth = (req, res, next) => {
  User.findById(req.userId)
    .select('-password')
    .then((user) => {
      // if user is not registered
      // then do not throw an error
      // because it's being handled
      // by react-router
      if (!user) {
        return res.status(403).json({
          message: 'User is not registered with gov-link'
        });
      }
      res.status(200).json({
        message: 'Success',
        user
      });
    })
    .catch((err) => {
      console.error(err.message);
    });
};

exports.signup = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        // user already exists
        // which is fine so
        // don't throw error code
        return res.status(200).json({
          message: 'User already exists.'
        });
      }
      bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
          const avatar = gravatar.url(email, {
            s: '200',
            r: 'g',
            g: 'mm'
          });
          const newUser = new User({
            ...req.body,
            password: hashedPassword,
            avatar
          });
          newUser
            .save()
            .then((result) => {
              if (!result) {
                res.status(400).json({
                  message:
                    'An error occurred with the save method inside signup controller function.'
                });
              }
              console.log('CREATED USER!!!', result);
              res.status(200).json({
                message: 'User was successfully created.',
                user: result
              });
            })
            .catch((err) => console.error(err.message));
        })
        .catch((err) => {
          console.error(err.message);
        });
    })
    .catch((err) => {
      console.error(err.message);
      return res.status(500).send('Server Error');
    });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.status(422).json({
          message: 'No user could be found with that email.'
        });
      }
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res.status(401).json({
              message: 'The email or password is incorrect.'
            });
          }

          sendRefreshToken(res, createRefreshToken(user));

          // console.log(
          //   'RESULT OF SEND_REFRESH_TOKEN',
          //   sendRefreshToken(res, createRefreshToken(user))
          // );

          console.log('REFRESH TOKEN SENT FROM LOGIN');

          return res.status(200).json({
            message: 'Login was successful',
            accessToken: createAccessToken(user),
            user
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.postRefreshToken = async (req, res, next) => {
  console.log('inside refreshToken controller function');

  const token = req.cookies['jid'];

  console.log('token in postRefreshToken', token);

  if (!token) {
    return res.send({ ok: false, accessToken: '' });
  }

  let payload = null;

  payload = jwt.verify(token, refreshTokenSecret);

  console.log('PAYLOAD', payload);

  const user = await User.findById(payload.userId);

  if (!user) {
    return res.send({ ok: false, accessToken: '' });
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    return res.send({ ok: false, accessToken: '' });
  }

  sendRefreshToken(res, createRefreshToken(user));

  console.log('REFRESH_TOKEN WAS SENT!!!');

  return res.status(200).json({
    ok: true,
    accessToken: createAccessToken(user),
    user
  });

  // token is valid and we
  // can send back an accessToken
};

exports.revokeRefreshTokensForUser = (userId) => {
  User.findOneAndUpdate(
    { _id: userId },
    {
      $inc: {
        tokenVersion: 1
      }
    },
    { new: true }
  ).then((updatedUser) => {
    if (!updatedUser) {
      res.send({ ok: false, accessToken: '' });
    }
    return true;
  });
};
