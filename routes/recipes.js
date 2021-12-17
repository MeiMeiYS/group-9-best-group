const express = require('express');
const { requireAuth, checkPermissionsRecipesRoute } = require('../auth');
const { csrfProtection, asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');
const { Sequelize } = require('../db/models');
const Op = Sequelize.Op;
const db = require('../db/models');
const { Image, Ingredient, Measurement, Recipe, RecipeCollection, RecipeIngredient, RecipeStatus, RecipeTag, Review, User, sequelize } = db;

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
router.get('/new', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
    //If user is logged in, display form for adding new recipe
    if (res.locals.authenticated){
        const measurements = await Measurement.findAll();
        res.render('recipe-new', { title: "Add a New Recipe", measurements, csrfToken: req.csrfToken() });
    } else {
        res.redirect('/login');
    }
}))



// /recipes/:id/edit
router.get('/:id(\\d+)/edit', requireAuth, csrfProtection, asyncHandler(async (req, res) => {

    const recipeId = parseInt(req.params.id, 10);
    const recipe = await Recipe.findByPk(recipeId, { include: [RecipeIngredient, User, Image] });
    const measurements = await Measurement.findAll();
    let imageUrl = null;
    if(recipe.imageId){
        imageUrl = recipe.Image.url;
    }
    checkPermissionsRecipesRoute(recipe, res.locals.user);
    const recipeIngredients = await RecipeIngredient.findAll({ where: { recipeId } });
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
    const qmiCount = qmiList.length;
    res.render('recipe-edit', { title: `Edit Recipe - ${recipe.name}`, csrfToken: req.csrfToken(), recipe, measurements, imageUrl, qmiList, qmiCount }) // revisit when pug is completed

}));

// /recipes/:id
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
    const recipe = await Recipe.findByPk(recipeId, { include: [RecipeIngredient, User, Image] });
    const { name, steps, description, imageId } = recipe;
    const recipeIngredients = await RecipeIngredient.findAll({ where: { recipeId } });

    let imageUrl = null;
    if(recipe.imageId){
        imageUrl = recipe.Image.url;
    }

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

    res.render('recipe-page', { title: recipe.name, recipe, imageUrl, qmiList })

}))

router.post('/:id(\\d+)', requireAuth, csrfProtection, imageValidators, recipeFormValidators, asyncHandler(async (req, res) => {

    if (res.locals.authenticated){
        const userId = res.locals.user.id
        const recipeId = parseInt(req.params.id, 10);
        const recipe = await Recipe.findByPk(recipeId, { include: [RecipeIngredient, User, Image] });
        checkPermissionsRecipesRoute(recipe, res.locals.user);
        const { name, description, steps, imageURL } = req.body;

        //get total count of qmi
        const qmiCount = req.body.qmiCount;

        //error validator
        const validatorErrors = validationResult(req.body);
        if (validatorErrors.isEmpty()) {
            if (imageURL) {
                const image = Image.build(imageURL)
                await image.save();
                const imageId = await Image.findOne({ where: { url: imageURL } });
                recipe.imageId = imageId;
            }
            //update recipe
            await recipe.update({ name, description, steps });

            //delete all old ingredients
            const oldRecipeIngredients = await RecipeIngredient.findAll({ where: {
                recipeId: {
                    [Op.eq]: recipeId
                }
            }})

            // oldRecipeIngredients.destroy
            for (let i = 0; i < oldRecipeIngredients.length; i++ ){
                oldRecipeIngredients[i].destroy()
            }

            //checking each ingredients
            for (let i = 0; i < qmiCount; i++){
                const ingredientName = req.body[`ingredient-${i+1}`];
                const ingredient = await Ingredient.findOne({ where: {
                    name: {
                        [Op.eq]: ingredientName
                    }
                }})

                if (!ingredient){
                    //if ingredient does not exit
                    const currentIngredient = await Ingredient.create({ name: ingredientName });
                    req.body.ingredientId = currentIngredient.id;

                } else {
                    //else find ingredient id
                    req.body.ingredientId = ingredient.id;
                }

                //build recipeIngredient join table
                const recipeId = recipe.id
                await RecipeIngredient.create({
                    recipeId,
                    ingredientId: req.body.ingredientId,
                    quantity: req.body[`quantity-${i+1}`],
                    measurementId: req.body[`measurement-${i+1}`]
                })
            }

            res.redirect(`/recipes/${recipe.id}`)
        } else {

            const measurements = await Measurement.findAll();
            const errors = validatorErrors.array().map(error => error.msg);
            res.render('recipe-new', { title: 'Add a New Recipe', measurements, errors, name, description, steps, imageURL, csrfToken: req.csrfToken()})

        }
    } else {
        res.redirect('/login');
    }

}));

// /recipes
router.get('/', asyncHandler(async (req, res) => {
    const recipeList = await Recipe.findAll({
        include: [Image, User],
        limit: 9,
        order: [
            [`createdAt`, 'DESC']
        ]
    });
    // get rating here and pass it in res.render object vvvvvv
    res.render('recipes', { recipeList })
}));

//-----------------------------------submitting a new recipe---------------------------------------------
router.post('/', requireAuth, csrfProtection, imageValidators, recipeFormValidators, asyncHandler(async (req, res) => {

    if (res.locals.authenticated){
        const userId = res.locals.user.id
        const { name, description, steps, imageURL } = req.body;
        //build recipe
        const recipe = Recipe.build({ name, description, steps, userId });

        //get total count of qmi
        const qmiCount = req.body.qmiCount;

        //error validator
        const validatorErrors = validationResult(req.body);
        if (validatorErrors.isEmpty()) {
            if (imageURL) {
                const image = Image.build(imageURL)
                await image.save();
                const imageId = await Image.findOne({ where: { url: imageURL } });
                recipe.imageId = imageId;
            }

            await recipe.save();

            //checking each ingredients
            for (let i = 0; i < qmiCount; i++){
                const ingredientName = req.body[`ingredient-${i+1}`];
                const ingredient = await Ingredient.findOne({ where: {
                    name: {
                        [Op.eq]: ingredientName
                    }
                }})

                if (!ingredient){
                    //if ingredient does not exit
                    const currentIngredient = await Ingredient.create({ name: ingredientName });
                    req.body.ingredientId = currentIngredient.id;

                } else {
                    //else find ingredient id
                    req.body.ingredientId = ingredient.id;
                }


                //build recipeIngredient join table
                const recipeId = recipe.id
                await RecipeIngredient.create({
                    recipeId,
                    ingredientId: req.body.ingredientId,
                    quantity: req.body[`quantity-${i+1}`],
                    measurementId: req.body[`measurement-${i+1}`]
                })

            }

            res.redirect(`/recipes/${recipe.id}`)
        } else {

            const measurements = await Measurement.findAll();
            const errors = validatorErrors.array().map(error => error.msg);
            res.render('recipe-new', { title: 'Add a New Recipe', measurements, errors, name, description, steps, imageURL, csrfToken: req.csrfToken()})

        }
    } else {
        res.redirect('/login');
    }

}))

//deleting a recipe
router.post(`/:id(\\d+)/delete`, requireAuth, csrfProtection, asyncHandler(async (req, res) => {
    const recipeId = req.params.id;
    const recipe = await Recipe.findByPk(recipeId);
    checkPermissionsRecipesRoute(recipe, res.locals.user);
    const tables = [RecipeStatus, RecipeCollection, Review, Recipe, RecipeTag, RecipeIngredient]
    tables.forEach(async table => {

        if (table == Recipe) {
            const data = await table.findByPk(recipeId);
            data.destroy();
        }
        const data = await table.findAll({ where: { recipeId } });
        data.destroy();
    });
}));


//please check and add any extra needed routes

module.exports = router;
