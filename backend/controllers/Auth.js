const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const { jwtSecret } = require('../../client/src/config');
const { validationResult } = require('express-validator');
const gravatar = require('gravatar');

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

exports.register = (req, res, next) => {
  console.log(req.body);

  User.findOne({ email })
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

exports.signup = (req, res, next) => {
  console.log('inside signup!!!!!!!!!!!');

  User.findById({ user_id })
    .then((user) => {
      if (user) {
        return res.status(422).json({
          message: 'User with that email already exists.'
        });
      }
      const newUser = new User({ ...req.body });
      newUser
        .save()
        .then((err, result) => {
          if (!err) {
            console.log('CREATED USER!!!', result);
            res.status(200).json({
              message: 'User was successfully created.',
              user: result
            });
          }
        })
        .catch((err) => {
          console.error(err.message);
          return res.status(400).send('Could not save user');
        });
    })
    .catch((err) => {
      console.error(err.message);
      return res.status(500).send('Server Error');
    });
};
