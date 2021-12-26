const express = require('express');
const { requireAuth, checkPermissionsRecipesRoute, checkPermissionsRoute } = require('../../auth');
const { csrfProtection, asyncHandler } = require('../utils');
const { check, validationResult } = require('express-validator');
const db = require('../../db/models');
const { Image, Ingredient, Measurement, Recipe, RecipeCollection, RecipeIngredient, RecipeStatus, RecipeTag, Review, User, sequelize } = db
const router = express.Router();

//validators:
const imageValidators = [
    check('imageURL')
        .custom((value, { req }) => {
            if (value) {
                check('imageURL')
                    .isURL()
                    .withMessage('If you want to upload an image, please provide a valid URL for the image.')
            }
        })
];

const reviewFormValidators = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a review.'),
    check('rating')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a rating.')
]

router.get('/recipe/:recipeId(\\d+)', asyncHandler(async (req, res) => {
    const recipeId = req.params.recipeId;
    const reviews = await Review.findAll({
        where: {
            recipeId: recipeId
        },
        include: [Image, User],
        limit: 9,
        order: [
            [`updatedAt`, 'ASC']
        ]
    });
    res.json({ reviews });
}));

// posting the review - what initiates when you click the 'submit review' button
//  --> need to be logged in
router.post('/', requireAuth, asyncHandler(async (req, res, next) => {
    const { recipeId, review, imageURL, userId, rating } = req.body;
    const validatorErrors = validationResult(req.body);
    if (validatorErrors.isEmpty()) {
        if (imageURL) {
            const image = await Image.create({ url: imageURL });
            const newReview = await Review.create({ recipeId, review, userId, rating, imageId: image.id })
            res.send({ newReview });
        }
        const newReview = await Review.create({ recipeId, review, userId, rating })
        res.send({ newReview });
    }
    else {
        const errors = validatorErrors.array().map(error => error.msg);
        res.send({ title: 'Add a new recipe', errors, csrfToken: req.csrfToken(), recipe, qmiList })
    }
}));

// /reviews/:id

// try sending csrf here instead of adding to DOM manipulation to reduce redundancy
router.get('/:id(\\d+)/edit', requireAuth, imageValidators, reviewFormValidators, csrfProtection, asyncHandler(async (req, res) => {
    const review = await Review.findByPk(req.params.id, { include: [User, Recipe, Image] });
    const recipe = await Recipe.findByPk(review.Recipe.id, {include: [Image]});
    const recipeIngredients = await RecipeIngredient.findAll({ where: { recipeId: recipe.id } });
    const imageURL = recipe.Image.url;
    const qmiList = [];
    for (let i = 0; i < recipeIngredients.length; i++) {
        const quantity = Math.round(recipeIngredients[i].quantity * 100) / 100;
        const measurement = await Measurement.findByPk(recipeIngredients[i].measurementId).then(measurement => measurement.dataValues.type);
        const ingredient = await Ingredient.findByPk(recipeIngredients[i].ingredientId).then(ingredient => ingredient.dataValues.name);
        qmiList.push({
            quantity,
            measurement,
            ingredient
        });
    }
    console.log("review", review);
    res.render('review-edit', { title: `Edit Your Review`, review, recipe, imageURL, csrfToken: req.csrfToken(), qmiList })
}));

// to edit review --> js, DOM stuff, add csrfProtection in DOM manipulation file


// PUTting the editted review
//  --> need to be logged in
//  --> need to be authorized (userId on review must match current user's Id)
//  --> also needs csrf, validators
router.put('/:id', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
    checkPermissionsRoute(review, res.locals.user);
    const { recipeId, review, imageId, imageURL, userId } = req.body;
    const reviewId = req.params.id;
    const currReview = await Review.findByPk(reviewId);
    if (validatorErrors.isEmpty()) {
        const image = Image.findByPk(imageId);
        if (imageURL) {
            image.url = imageURL;
            await image.save();
        }
        else {
            if (imageId) {
                // delete image
                await image.destroy();
            }
            await review.save();
        }
    } else {
        const errors = validatorErrors.array().map(error => error.msg);
        res.send('send some JSON thing', { title: 'Add a new recipe', errors, csrfToken: req.csrfToken(), recipe, qmiList })
    }
}));

// delete a review
//  --> need to be logged in
//  --> need to be authorized (userId on review must match current user's Id)
//      --> DOM stuff, add csrfProtection in DOM manipulation file that has the delete button
router.delete('/:id', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
    const { recipeId, reviewId, imageURL, userId } = req.body;
    const review = Review.findByPk(reviewId);
    checkPermissionsRoute(review, req.locals.user);
    const data = await Review.findByPk(reviewId);
    await data.destroy();
    res.send('you have DELETED /reviews/:id')
}));


module.exports = router;
