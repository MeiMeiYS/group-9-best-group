const express = require('express');
const { requireAuth, checkPermissionsRecipesRoute } = require('../auth');
const { csrfProtection, asyncHandler, addAverageRatingProperty } = require('./utils');
const { check, validationResult } = require('express-validator');
const { Sequelize } = require('../db/models');
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
    let imageURL = null;
    if(recipe.imageId){
        imageURL = recipe.Image.url;
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
    res.render('recipe-edit', { title: `Edit Recipe - ${recipe.name}`, csrfToken: req.csrfToken(), recipe, measurements, imageURL, qmiList, qmiCount }) // revisit when pug is completed

}));

// /recipes/:id
router.get('/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
    const recipe = await Recipe.findByPk(recipeId, {
        include: [
            { model: RecipeIngredient },
            { model: User },
            { model: Image },
            {
                model: Review,
                include: [Image, User]
            }
        ]
    });

    const { name, steps, description, imageId } = recipe;
    const recipeIngredients = await RecipeIngredient.findAll({ where: { recipeId } });
    const reviews = recipe.Reviews;
    console.log("reviewsUSER", reviews[0].User.dataValues.userName);

    let averageReview = `No Reviews Posted`
    if (recipe.Reviews) {
        if (recipe.Reviews.length) {
            averageReview = `Average Review: ${Math.ceil(recipe.Reviews.map(review => review.rating).reduce((acc, el) => acc + el) / recipe.Reviews.length)}`
        }
    }

    addAverageRatingProperty([recipe])

    let imageURL = null;
    if (recipe.imageId) {
        imageURL = recipe.Image.url;
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

    //would like users collections to be able to render on recipe page as well

    let userId
    let collections

    if (res.locals.user) {
        userId = res.locals.user.id;
        collections = await db.Collection.findAll({
            where: {
                userId
            }
        });
    } else {
        collections = [];
    }

    res.render('recipe-page', { title: recipe.name, recipe, imageURL, qmiList, averageReview, reviews, collections, csrfToken: req.csrfToken() })

}))

//submit a edit recipe
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


            const oldImageId = recipe.imageId;
            const oldImageURL = recipe.Image.url;
            //if there is url input and is different from the old one
            if (imageURL && oldImageURL !== imageURL){
                //if image is different, need to update
                const image = await Image.findByPk(oldImageId);
                await image.update({ url: imageURL });
            }
            //if there is no url input but has image before
            else if (!imageURL && oldImageId) {
                //delete the old image from database
                await Image.destroy({ where: { id: oldImageId }});
            }
            //if there was no image before and want to create one now
            else if (imageURL && !oldImageId) {
                const newImage = await Image.create({ url: imageURL });
                await recipe.update({ imageId: newImage.dataValues.id });
            }
            else if (!imageURL){
                const randomRecipeImage = () => {
                    return (Math.floor(Math.random()*9) + 1).toString();
                }
                await recipe.update({ imageId: randomRecipeImage() });
            }


            //update recipe
            await recipe.update({ name, description, steps });

            //delete all old ingredients
            const oldRecipeIngredients = await RecipeIngredient.findAll({ where: { recipeId } })

            // oldRecipeIngredients.destroy
            for (let i = 0; i < oldRecipeIngredients.length; i++ ){
                oldRecipeIngredients[i].destroy()
            }

            //checking each ingredients
            for (let i = 0; i < qmiCount; i++){
                const ingredientName = req.body[`ingredient-${i+1}`];
                const ingredient = await Ingredient.findOne({ where: { name: ingredientName } })

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
    const recentRecipes = await Recipe.findAll({
        include: [Image, User, Review],
        limit: 9,
        order: [
            [`updatedAt`, 'DESC']
        ]
    });

    addAverageRatingProperty(recentRecipes)
    // get rating here and pass it in res.render object vvvvvv
    res.render('recipes', { recentRecipes })
}));

//-----------------------------------submitting a new recipe---------------------------------------------
router.post('/', requireAuth, csrfProtection, imageValidators, recipeFormValidators, asyncHandler(async (req, res) => {

    if (res.locals.authenticated){
        const userId = res.locals.user.id
        let { name, description, steps, imageURL } = req.body;
        //if recipe name is used by this current user, than will send a error message
        name = name.toLowerCase();
        const checkRecipe = await Recipe.findOne({ where: { name, userId }})
        if (checkRecipe) {
            const measurements = await Measurement.findAll();
            const nameErrMsg = 'You already have a recipe with this recipe name.'
            res.render('recipe-new', { title: 'Add a New Recipe', measurements, nameErrMsg, name, description, steps, imageURL, csrfToken: req.csrfToken()})
            res.end();
        } else {
            const qmiCount = req.body.qmiCount;

            //error validator
            const validatorErrors = validationResult(req.body);
            if (validatorErrors.isEmpty()) {
                let imageId
                if (imageURL) {
                    const newImage = await Image.create({ url: imageURL })
                    imageId = newImage.dataValues.id ;
                } else {
                    const randomRecipeImage = () => {
                        return (Math.floor(Math.random()*9) + 1).toString()
                    }
                    imageId = randomRecipeImage();
                }

                const recipe = Recipe.build({ name, description, steps, userId, imageId });

                await recipe.save();

                //checking each ingredients
                for (let i = 0; i < qmiCount; i++){
                    const ingredientName = req.body[`ingredient-${i+1}`];
                    const ingredient = await Ingredient.findOne({ where: { name: ingredientName } })

                    if (!ingredient){
                        //if ingredient does not exit
                        const currentIngredient = await Ingredient.create({ name: ingredientName });
                        req.body.ingredientId = currentIngredient.id;

                    } else {
                        //else find ingredient id
                        req.body.ingredientId = ingredient.id;
                    }


                    //build recipeIngredient join table
                    const recipeId = recipe.dataValues.id;
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
            const validatorErrors = validationResult(req.body);
            res.render('recipe-new', { title: 'Add a New Recipe', validatorErrors, measurements, errors, name, description, steps, imageURL, csrfToken: req.csrfToken()})

        }
        }

    } else {
        res.redirect('/login');
    }

}))

//deleting a recipe
router.post(`/:id(\\d+)/delete`, requireAuth, csrfProtection, asyncHandler(async (req, res) => {
    if (res.locals.authenticated){
        const userId = res.locals.user.id
        const recipeId = req.params.id;
        const recipe = await Recipe.findByPk(recipeId);
        checkPermissionsRecipesRoute(recipe, res.locals.user);
        //delete RecipeIngredients
        await RecipeIngredient.destroy({ where: { recipeId } })
        //delete RecipeStatus
        await RecipeStatus.destroy({ where: { recipeId, userId } })
        //delete RecipeCollections
        await RecipeCollection.destroy({ where: { recipeId } })
        //delete RecipeTags
        await RecipeTag.destroy({ where: { recipeId } })
        //delete Reviews
        await Review.destroy({ where: { recipeId } })
        //delete recipe
        await Recipe.destroy({ where: { id: recipeId } })
        //delete image if it is not a default image
        const imageId = recipe.imageId
        if (imageId && imageId > 9) await Image.destroy({ where: { id: imageId } })

        res.redirect('/recipes')
    } else {
        res.redirect('/login');
    }
}));




//please check and add any extra needed routes

module.exports = router;
