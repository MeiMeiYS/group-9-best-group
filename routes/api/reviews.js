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
        })
];

const reviewFormValidators = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a review.')
]

// /reviews
// these routes will be API, res will we be sent in json format

// get the form to post A NEW review -- this is DOM manipulation
//  --> need to be logged in
//  --> also needs csrf


router.get('/', (req, res) => { // for testing, can see all reviews but in production, we will delete this route
    // Mei's code for displaying top 9 recipes
    res.send('you have reached /reviews')
})

// posting the review - what initiates when you click the 'submit review' button
//  --> need to be logged in
//  --> also needs csrf
//  --> needs validator
router.post('/', requireAuth, reviewFormValidators, imageValidators, asyncHandler(async (req, res, next) => {
    const { recipeId, review, imageURL, userId, rating } = req.body;
    console.log("recipeId", recipeId);
    console.log("imageURL", imageURL);
    console.log("userId", userId);
    console.log("review", review === true);
    const validatorErrors = validationResult(req.body);
    if (validatorErrors.isEmpty()) {
        console.log("no errors");
        if (imageURL) {
            const image = await Image.create({ url: imageURL });
            console.log(`imageId #${image.id} created` );
            const newReview = await Review.create({ recipeId, review, userId, rating, imageId: image.id })
            res.send({newReview});
        }
        const newReview = await Review.create({ recipeId, review, userId, rating })
        res.json({newReview});
    }
    else {
        const errors = validatorErrors.array().map(error => error.msg);
        res.send('send some JSON thing', { title: 'Add a new recipe', errors, csrfToken: req.csrfToken(), recipe, qmiList })
    }
}));

// /reviews/:id

// try sending csrf here instead of adding to DOM manipulation to reduce redundancy
router.get('/:id', (req, res) => { // this should be in DOM
    res.send('you have reached /reviews/:id')
})

// to edit review --> js, DOM stuff, add csrfProtection in DOM manipulation file

// PUTting the editted review
//  --> need to be logged in
//  --> need to be authorized (userId on review must match current user's Id)
//  --> also needs csrf, validators
router.put('/:id', requireAuth, csrfProtection, reviewFormValidators, imageValidators, asyncHandler(async (req, res) => {
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
