const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const { jwtSecret } = require('../../client/src/config');
const { validationResult } = require('express-validator');
const gravatar = require('gravatar');

// create function that
// checks to see if a
// user is new each time
// the user logs in

exports.getAppUser = (req, res, next) => {
  const { id } = req.params;
  User.findOne({ appUserId: id })
    .then((user) => {
      // if user is not registered
      // then do not throw an error
      // because it's being handled
      // by react-router
      if (!user) {
        return res.status(404).json({
          message: 'User is not registered with gov-link'
        });
      }
      return res.status(200).json({
        message: 'Success',
        user: user
      });
    })
    .catch((err) => {
      console.error(err.message);
    });
};

exports.register = (req, res, next) => {
  const { email } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      console.log(user);
      if (!user) {
        return res.status(403).json({
          message: 'Email or password is invalid.'
        });
      }
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(403).json({
            message: 'Email or password is invalid.'
          });
        }
        const token = jwt.sign(
          {
            _id: user._id.toString()
          },
          jwtSecret
          // { expiresIn: '1hr' }
        );
        return res.status(200).json({
          success: true,
          token
        });
      });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send('Servor Error');
    });
};

exports.createNewUser = (req, res, next) => {
  const {
    isAppUser,
    appUserId,
    firstName,
    lastName,
    email,
    email_verified,
    family_name,
    given_name,
    locale,
    nickname,
    picture,
    sub
  } = req.body;

  User.findOne({ appUserId: appUserId })
    .then((user) => {
      if (user) {
        // user already exists
        // which is fine so
        // don't throw error code
        return res.status(200).json({
          message: 'User already exists.'
        });
      } else {
        const newUser = new User({
          isAppUser,
          appUserId,
          firstName,
          lastName,
          email,
          email_verified,
          family_name,
          given_name,
          locale,
          nickname,
          picture,
          sub
        });
        newUser
          .save()
          .then((result) => {
            console.log('User was successfully created!!!', result);
            return res.status(200).json({
              message: 'User was successfully created.',
              user: result
            });
          })
          .catch((err) => {
            console.error(err.message);
            return res.status(400).json({
              message: 'Could not save user',
              error: err
            });
          });
      }
    })
    .catch((err) => {
      console.error(err.message);
      return res.status(500).send('Server Error');
    });
};
