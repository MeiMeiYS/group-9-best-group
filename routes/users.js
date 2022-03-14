const express = require('express');
const { csrfProtection, asyncHandler, addAverageRatingProperty } = require('./utils');
const { check, validationResult } = require('express-validator');
const db = require('../db/models');
const { User, Recipe, Review, Collection, Tag, StatusType, Image } = db;
const bcrypt = require('bcryptjs');
const { loginUser, restoreUser, userLogout, requireAuth, checkPermissionsUsersRoute } = require('../auth');

const router = express.Router();

/* GET signup. */
router.get('/signup', csrfProtection, function (req, res, next) {
  const user = User.build();
  res.render('../views/users-signup', { user, csrfToken: req.csrfToken(), title: "Sign up!" });
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


router.post('/signup', csrfProtection, userValidators, asyncHandler(async (req, res, next) => {
  const {
    email,
    userName,
    password,

  } = req.body;

  const randomUserImage = () => {
    return (Math.floor(Math.random()*9) + 19).toString()
  }

  const imageId = randomUserImage()

  const user = User.build({
    email,
    userName,
    imageId
  })

  const validatorErrors = validationResult(req);
  if (validatorErrors.isEmpty()) {
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
  res.render('../views/users-login', { csrfToken: req.csrfToken(), title: "Login" });
});

router.post('/login', csrfProtection, loginValidators, asyncHandler(async (req, res, next) => {
  const {
    email,
    password
  } = req.body;

  let errors = [];
  const validatorErrors = validationResult(req);
  if (validatorErrors.isEmpty()) {
    const user = await User.findOne({ where: { email } });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());
      if (passwordMatch) {
        loginUser(req, res, user);
        return await res.redirect('/');
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
});

router.get('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = await User.findByPk(userId, {
    include: [
      {
        model: Recipe,
        include: [
          {
            model: Tag
          },
          {
            model: StatusType
          },
          {
            model: Image
          },
          {
            model: Review
          },
          {
            model: User
          }
        ]
      },
      {
        model: Image
      },
      {
        model: Collection,
        include: [
          {
            model: Recipe,
            include: [
              {
                model: Tag
              },
              {
                model: StatusType
              },
              {
                model: Image
              },
              {
                model: Review
              }
            ]
          }
        ]
      }
    ]
  });

  checkPermissionsUsersRoute(user, res.locals.user);

  const recipes = await Recipe.findAll({
    where: {
      userId
    },
    include: [
      {
        model: Tag
      },
      {
        model: StatusType
      },
      {
        model: Image
      },
      {
        model: Review,
      },
      {
        model: User
      }
    ]
  })

  const reviews = await Review.findAll({
    where: {
      userId
    }
  })

  const collections = user.Collections
  let memberSince = " " + user.createdAt.toDateString().slice(4)
  let recipesAdded = 0
    if(recipes.length) recipesAdded = recipes.length;
  let reviewsAdded = reviews.length;

  let addAverageRatingProperty = (recipes) => {
    recipes.forEach(recipe => {
      if (recipe.Reviews.length) {
        recipe.averageRating = Math.ceil(recipe.Reviews.map(review => review.rating).reduce((acc, el) => acc + el) / recipe.Reviews.length).toString()
      } else {
        recipe.averageRating = `No Ratings`
      }
    })
    return recipes
  }

  addAverageRatingProperty(recipes)

  res.render('users-id', { user, recipes, collections, memberSince, reviewsAdded, recipesAdded })

}));

router.get('/:id(\\d+)/edit', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id);
  const user = await User.findByPk(userId, {include: db.Image});
  checkPermissionsUsersRoute(user, res.locals.user);

  res.render('users-edit', { title: 'Edit User', user, csrfToken: req.csrfToken() })

}));

const imageValidators = [
  check('imageURL')
    .custom((value, { req }) => {
      if (value) {
        check(value)
          .isURL()
          .withMessage('If you want to upload an image, please provide a valid URL for the image.')
      }
    })
];

router.post('/:id(\\d+)/image/new', requireAuth, csrfProtection, imageValidators, asyncHandler(async (req, res) => {
  const { url } = req.body;

  //building new image from the url the user submitted
  // const image = await db.Image.build(
  //   {
  //     url
  //   }
  // )

  const userId = parseInt(req.params.id);
  const user = await User.findByPk(userId)

  checkPermissionsUsersRoute(user, res.locals.user);

  const validatorErrors = validationResult(req.body);

  //checking if url submitted is valid and if is, update user with the id associated with the url
  if (validatorErrors.isEmpty()) {
    let imageId
    if (url) {
      const image = await db.Image.build({ url })
      await image.save();
      imageId = image.id
    } else {
      const randomUserImage = () => {
        return (Math.floor(Math.random()*9) + 19).toString()
      }

      imageId = randomUserImage()
    }
    await user.update(
      {
        imageId
      }
    )

    res.redirect(`/users/${userId}`)
    // res.json({ userToUpdate, image })
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);

    res.render('users-edit', { errors, title: 'Edit User', user, csrfToken: req.csrfToken() })
  }

}));


router.post('/:id(\\d+)/image/delete', requireAuth, asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id);

  const user = await User.findByPk(userId);
  checkPermissionsUsersRoute(user, res.locals.user);

  const randomUserImage = () => {
    return (Math.floor(Math.random()*9) + 19).toString()
  }

  const imageId = randomUserImage()

  await user.update(
    {
      imageId
    }
  )

  res.redirect(`/users/${userId}`)
}));

module.exports = router;
