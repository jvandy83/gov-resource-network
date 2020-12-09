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
      if (!user) {
        return res.status(500).send('Server Error');
      }
      return res.json(user);
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
        return res.status(422).json({
          message: 'User with that email already exists.'
        });
      }
      bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
          const newUser = new User({ ...req.body, password: hashedPassword });
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
  const { email, password } = req.body.data;

  User.findOne({ email }).then((user) => {
    if (!user) {
      res.status(422).json({
        message: 'No user could be found with that email.'
      });
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        res.status(401).json({
          message: 'The email or password is incorrect.'
        });
      }
      const token = jwt.sign(
        {
          userId: user._id.toString()
        },
        {
          secret: jwtSecret
        }
      );
      res.status(200).json({
        message: 'Login was successful',
        token
      });
    });
  });
};
