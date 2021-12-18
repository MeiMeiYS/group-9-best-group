var express = require('express');
var router = express.Router();
const { asyncHandler, addAverageRatingProperty } = require('./utils');
const db = require('../db/models');



/* GET home page. */
router.get('/', asyncHandler(async function (req, res, next) {
  const recipes = await db.Recipe.findAll(
    {
      limit: 9,
      include: [
        {
          model: db.Tag
        },
        {
          model: db.StatusType
        },
        {
          model: db.Image
        },
        {
          model: db.Review
        },
        {
          model: db.User
        },
      ]
    }
  )

  addAverageRatingProperty(recipes);

  res.render('index', { title: 'Home', recipes });
}));

module.exports = router;
