const express = require('express');
const { asyncHandler } = require('../utils');
const { check, validationResult } = require('express-validator');
const db = require('../../db/models');
const { requireAuth, checkPermissionsRecipesRoute } = require('../../auth')

const router = express.Router();

const { Collection, RecipeCollection, Recipe } = db;

//add recipe to a collection
router.post('/', requireAuth, asyncHandler(async (req, res, next) => {
    const { recipeId, collectionId } = req.body;
    const userId = res.locals.user.id;

    const recipe = await Recipe.findByPk(recipeId);
    const collection = await Collection.findByPk(collectionId);

    const recipeCollection = await RecipeCollection.findAll({
        where: {
            recipeId: recipeId,
            collectionId: collectionId
        }
    })

    checkPermissionsRecipesRoute(collection, res.locals.user);

    if (recipeCollection.length = 0) {
        const newRecipeCollection = await RecipeCollection.create({
            recipeId: recipeId,
            collectionId: collectionId
        })

        res.json({ newRecipeCollection })
    } else {
        const err = Error('This recipe is already in this collection')
    }
}));


//delete recipe from a collection
router.delete('/', requireAuth, asyncHandler(async (req, res) => {
    const { recipeId, collectionId } = req.body;
    const userId = res.locals.user.id;

    const recipe = await Recipe.findByPk(recipeId);
    const collection = await Collection.findByPk(collectionId);
    const recipeCollection = await RecipeCollection.findOne({
        where: {
            recipeId: recipeId,
            collectionId: collectionId
        }
    })

    checkPermissionsRecipesRoute(collection, res.locals.user);

    if (recipeCollection) {
        await recipeCollection.destroy();
        res.json({message: `Deleted recipe ${recipe.name} from collection ${collection.name}.`})
    } else {
        next()
    }
}));

module.exports = router;
