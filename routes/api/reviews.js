const express = require('express');
const { requireAuth, checkPermissionsRecipesRoute, checkPermissionsRoute } = require('../../auth');
const { csrfProtection, asyncHandler } = require('../utils');
const { check, validationResult } = require('express-validator');
const db = require('../db/models');
const { Image, Ingredient, Measurement, Recipe, RecipeCollection, RecipeIngredient, RecipeStatus, RecipeTag, Review, User, sequelize } = db
const router = express.Router();

//validators:
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

const reviewFormValidators = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a review.')
]

// /reviews
// these routes will be API, res will we be sent in json format

// get the form to post the review
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
router.post('/', requireAuth, csrfProtection, reviewFormValidators, imageValidators, asyncHandler(async (req, res) => {
    const { recipeId, review, imageURL, userId } = req.body;
    const newReview = Review.build({ recipeId, review, imageId, userId })
    checkPermissionsRoute(review, res.locals.user);
    if (validatorErrors.isEmpty()) {
        if (imageURL) {
            const image = Image.build(imageURL)
            await image.save();
            const imageId = await Image.findOne({ where: { url: imageURL } });
            review.imageId = imageId;
        }
        await review.save();
    } else {
        const errors = validatorErrors.array().map(error => error.msg);
        res.send('send some JSON thing', { title: 'Add a new recipe', errors, csrfToken: req.csrfToken(), recipe, qmiList })
    }
    res.json(newReview);
}))

// /reviews/:id

// try sending csrf here instead of adding to DOM manipulation to reduce redundancy
router.get('/:id', (req, res) => {
    res.send('you have reached /reviews/:id')
})

// to edit review --> js, DOM stuff, add csrfProtection in DOM manipulation file

// putting the editted review
//  --> need to be logged in
//  --> need to be authorized (userId on review must match current user's Id)
//  --> also needs csrf
router.put('/:id', (req, res) => {
    res.send('you have PUT /reviews/:id')
})

// delete a review
//  --> need to be logged in
//  --> need to be authorized (userId on review must match current user's Id)
//      --> DOM stuff, add csrfProtection in DOM manipulation file that has the delete button
router.delete('/:id', (req, res) => {
    res.send('you have DELETED /reviews/:id')
})


module.exports = router;
