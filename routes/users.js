const express = require('express');
const { csrfProtection, asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');
const db = require('../db/models');
const { User } = db;

const router = express.Router();

/* GET signup. */
router.get('/signup', csrfProtection, function (req, res, next) {
  const user = User.build();
  res.render('respond with a resource');
});

module.exports = router;
