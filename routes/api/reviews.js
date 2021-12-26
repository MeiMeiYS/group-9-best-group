const express = require('express');
const { requireAuth, checkPermissionsRecipesRoute, checkPermissionsRoute } = require('../../auth');
const { csrfProtection, asyncHandler } = require('../utils');
const { check, validationResult } = require('express-validator');
const db = require('../../db/models');
const { Image, Ingredient, Measurement, Recipe, RecipeCollection, RecipeIngredient, RecipeStatus, RecipeTag, Review, User, sequelize } = db
const router = express.Router();

// /reviews
// these routes will be API, res will we be sent in json format

// get the form to post A NEW review -- this is DOM manipulation
//  --> need to be logged in
//  --> also needs csrf


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
    res.json({reviews});
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
router.get('/:id(\\d+)/edit', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
    const review = await Review.findByPk(req.params.id);
    const recipe = await Recipe.findByPk(review.recipeId);
    res.render('review-edit', {title: `Edit Your Review`, review, recipe, csrfToken: req.csrfToken(), })
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
