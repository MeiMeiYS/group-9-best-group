const express = require('express');
const { csrfProtection, asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');
const db = require('../db/models');
const { Recipe, Image } = db;

const router = express.Router();

const recipeFormValidators = [
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
    const { name, description, userId, steps, imageURL, qmiList } = req.body;
    //qmiList stands for quantity, measurments, and ingredient name

    const recipe = Recipe.build({name, description, userId, steps});
    //error validator
    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()){
        if (imageURL) {
            const image = Image.build(imageURL)
            await image.save();
            const imageId = await Image.findOne({ where: { url: imageURL } });
            recipe.imageId = imageId;
        }
        await recipe.save();
    } else {
        const errors = validatorErrors.array().map(error => error.msg);
        res.render('recipes-form', { title: 'Add a new recipe', errors, csrfToken: req.csrfToken(), recipe, qmiList })
    }

}))



//please check and add any extra needed routes

module.exports = router;
