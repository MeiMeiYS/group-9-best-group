const express = require('express');
const { csrfProtection, asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');
const db = require('../db/models');
const { User } = db;
const bcrypt = require('bcryptjs');
const { loginUser, restoreUser, userLogout, requireAuth } = require('../auth');

const router = express.Router();

/* GET signup. */
router.get('/signup', csrfProtection, function (req, res, next) {
  const user = User.build();
  res.render('../views/users-signup', {user, csrfToken: req.csrfToken(), title: "Sign up!"});
});

const userValidators = [
  check('userName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a username.')
    .isLength({ max: 50 })
    .withMessage('Username must be no longer than 50 characters long.')
    .custom(value => {
      return User.findOne({ where: { userName: value } })
      .then(user => {
        if (user) {
          return Promise.reject('This username is already being used.')
        }
      })
    }),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an email address.')
    .isLength({ max: 255 })
    .withMessage('Email must be no longer than 255 characters long.')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom(value => {
      return User.findOne({ where: { email: value } })
      .then(user => {
        if (user) {
          return Promise.reject('This email is already being used.')
        }
      })
    }),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Password')
      .isLength({ max: 20 })
      .withMessage('Password must not be more than 20 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
      .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
    check('confirmPassword')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Confirm Password')
      .isLength({ max: 20 })
      .withMessage('Confirm Password must not be more than 20 characters long')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Confirm Password does not match Password');
        }
        return true;
      })
];

const loginValidators = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an email address.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password')
];


router.post('/signup', csrfProtection, userValidators, asyncHandler( async (req, res, next) => {
  const {
    email,
    userName,
    password,

  } = req.body;

  const user = User.build({
    email,
    userName,
  })

  const validatorErrors = validationResult(req);
  if (validatorErrors.isEmpty()){
    const hashedPassword = await bcrypt.hash(password, 10);
    user.hashedPassword = hashedPassword;
    await user.save();
    loginUser(req, res, user);
    res.redirect('/');
  } else {

    const errors = validatorErrors.array().map(error => error.msg);
    res.render('users-signup', {
      title: "Sign up!",
      user,
      errors,
      csrfToken: req.csrfToken()
    })
  }

}))

router.get('/login', csrfProtection, function (req, res, next) {
  res.render('../views/users-login', { csrfToken: req.csrfToken(), title: "Login"});
});

router.post('/login', csrfProtection, loginValidators, asyncHandler( async (req, res, next) => {
  const {
    email,
    password
  } = req.body;

  let errors = [];
  const validatorErrors = validationResult(req);
  if (validatorErrors.isEmpty()){
    const user = await User.findOne({ where: {email} });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());
      if (passwordMatch) {
        loginUser(req, res, user);
        return res.redirect('/');
      }
    }

    errors.push('Login failed for given email and password.');
  } else {
    errors = validatorErrors.array().map(error => error.msg);
  }
  res.render('users-login', {
    title: "Login",
    email,
    errors,
    csrfToken: req.csrfToken()
  })
}));

router.post('/logout', (req, res) => {
  userLogout(req, res);
  res.redirect('/');
});

module.exports = router;
