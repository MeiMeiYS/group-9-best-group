const express = require('express');
const { csrfProtection, asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');
const db = require('../db/models');
const { Recipe } = db;

const router = express.Router();

const recipeValidators = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a name for your recipe.')
        .isLength({ max: 255 })
        .withMessage('Recipe name must not be more than 255 characters long.'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a short description for your recipe.'),
    check('steps')
        .exists({ checkFalsy: true })
        .withMessage('Please provide the instructions for your recipe.'),
];

const imageValidators = [
    check('imageURL')
        .custom((value, {req}) => {
            if (value) {
                check(value)
                    .isURL()
                    .withMessage('If you want to upload an image, please provide a valid URL for the image.')
            }
        })
];

// /recipes/new
router.get('/new', csrfProtection, (req, res) => {
    res.render('recipes-form', { title: "Add a New Recipe", csrfToken: req.csrfToken() })
    // res.send('you are now on /recipes/new')
})



// /recipes/:id/edit
router.get('/:id/edit', csrfProtection, asyncHandler(async (req, res) => {
    // res.send('you are now on /recipes/:id/edit')
    const recipeId = parseInt(req.params.id, 10);
    const recipe = await Recipe.findByPk(recipeId);
    res.render('recipes-form', { title: "Edit Recipe", csrfToken: req.csrfToken(), recipe })
})
)

// /recipes/:id

router.get('/:id', (req, res) => {
    res.send('you are now on /recipes/:id')
})

router.post('/:id', (req, res) => {
    res.send('you are now on /recipes/:id POST')
})

// /recipes

router.get('/', (req, res) => {
    res.send('you are now on /recipes')
})

router.post('/', csrfProtection, imageValidators, recipeValidators, asyncHandler(async (req, res) => {
    // process incoming stuff
    const { name, description, userId, steps, imageURL } = req.body;
    if (imageURL) {
        const image = await Image.build('url')
    }
    const recipe = await Recipe.build()
    // if (image passed validation) --> check if recipe also passes validation --> build image/recipe
    // insert validation
    res.redirect(`/${recipeId}`, { title: `${name}`, csrfToken: req.csrfToken() })
    // res.send('you are now on /recipes POST')
}))



//please check and add any extra needed routes

module.exports = router;
