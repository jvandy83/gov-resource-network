const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const { jwtSecret } = require('../../client/src/config');
const { validationResult } = require('express-validator');
const gravatar = require('gravatar');

const { jwtSecret } = require('../config/keys');

exports.getAuth = (req, res, next) => {
  User.findById(req.user._id)
    .select('-password')
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

  User.findOne({ email }).then((user) => {
    if (!user) {
      res.status(422).json({
        message: 'No user could be found with that email.'
      });
    }
    bcrypt
      .compare(password, user.password)
      .then((isMatch) => {
        if (!isMatch) {
          res.status(401).json({
            message: 'The email or password is incorrect.'
          });
        }
        const token = jwt.sign(
          {
            userId: user._id.toString()
          },
          jwtSecret
        );
        if (token) {
          return res.status(200).json({
            message: 'Login was successful',
            token,
            user
          });
        }
        res.status(400).json({
          message:
            'An error occurred while trying to create a token inside login controller function.'
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: 'Server Error'
        });
      });
  });
};
