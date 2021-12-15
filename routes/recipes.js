const express = require('express');
const { csrfProtection, asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');
const db = require('../db/models');
const { Recipe, Image, RecipeIngredient, Measurement, Ingredient } = db;

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
        .custom((value, { req }) => {
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
    const { name, steps, description, imageId } = recipe;
    const recipeIngredients = await RecipeIngredient.findAll({ where: { recipeId } });
    const qmiList = [];
    for (let i = 0; i < recipeIngredients.length; i++) {
        const quantity = recipeIngredients[i].quantity;
        const measurement = await Measurement.findByPk(recipeIngredients[i].measurementId).then(measurement => measurement.dataValues.type);
        const ingredient = await Ingredient.findByPk(recipeIngredients[i].ingredientId).then(ingredient => ingredient.dataValues.name);
        qmiList.push({
            quantity,
            measurement,
            ingredient
        });
    }
    if (imageId) {
        const image = await Image.findByPk(imageId);
        const imageURL = image.url;
        res.render('recipes-form', { title: "Edit Recipe", csrfToken: req.csrfToken(), qmiList, imageURL, name, steps, description }) // revisit when pug page is completed
    }
    res.render('recipes-form', { title: "Edit Recipe", csrfToken: req.csrfToken(), qmiList, recipe }) // revisit when pug is completed
})
)

// /recipes/:id
router.get('/:id', asyncHandler(async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
    const recipe = await Recipe.findByPk(recipeId);
    const { name, steps, description, imageId } = recipe;
    const recipeIngredients = await RecipeIngredient.findAll({ where: { recipeId } });
    const qmiList = [];
    for (let i = 0; i < recipeIngredients.length; i++) {
        const quantity = recipeIngredients[i].quantity;
        const measurement = await Measurement.findByPk(recipeIngredients[i].measurementId).then(measurement => measurement.dataValues.type);
        const ingredient = await Ingredient.findByPk(recipeIngredients[i].ingredientId).then(ingredient => ingredient.dataValues.name);
        qmiList.push({
            quantity,
            measurement,
            ingredient
        });
    }
    if (imageId) {
        const image = await Image.findByPk(imageId);
        const imageURL = image.url;
        res.render('recipe-page', { title: recipe.name, qmiList, imageURL, name, steps, description }) // revisit when pug page is completed
    }
    res.render('recipe-page', { title: recipe.name, qmiList, name, steps, description }) // revisit when pug page is completed
}))

router.post('/:id', csrfProtection, imageValidators, recipeFormValidators, asyncHandler(async (req, res) => {
    // process incoming stuff
    const { name, description, userId, steps, imageURL, qmiList } = req.body;
    const recipeId = parseInt(req.params.id, 10);
    //qmiList stands for quantity, measurments, and ingredient name
    // find recipe
    const recipe = await Recipe.findByPk(recipeId);
    const imageId = recipe.imageId;
    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
        if (imageId) {
            // find imageId (if there)
            const image = Image.findByPk(imageId);
            if (imageURL) {
                // if (imageId) --> update URL if URL is in the new updated recipe
                image.url = imageURL;
                await image.save();
                res.render('recipes-form', { title: 'Editing a Recipe', errors, csrfToken: req.csrfToken(), recipe, qmiList, imageURL }) // revisit when pug is done
            }
            // if (imageId) --> no new URL --> remove imageId from recipeId, delete that row in db
            else {
                image.destroy();
                recipe.imageId = null;
                recipe.save();
                res.render('recipes-form', { title: 'Editing a Recipe', errors, csrfToken: req.csrfToken(), recipe, qmiList}) // revisit when pug is done
            }
        }
    } else {
        const errors = validatorErrors.array().map(error => error.msg);
        res.render('recipes-form', { title: 'Editing a Recipe', errors, csrfToken: req.csrfToken(), recipe, qmiList, imageURL }) // revisit when pug is done
    }
}));

// /recipes
router.get('/', (req, res) => {
    const recipeList = await Recipe.findAll({
        include: [ Image, User ],
        limit: 9,
        order: ['createdAt', 'DESC']
     })
     // get rating here and pass it in res.render object vvvvvv
    res.render('recipes', { recipeList })
})

router.post('/', csrfProtection, imageValidators, recipeFormValidators, asyncHandler(async (req, res) => {
    // process incoming stuff
    const { name, description, userId, steps, imageURL, qmiList } = req.body;
    //qmiList stands for quantity, measurments, and ingredient name

    const recipe = Recipe.build({ name, description, userId, steps });
    //error validator
    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
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
