const express = require('express');
const router = express.Router();
const db = require('../../db/models');
const { RecipeStatus } = db;
const { asyncHandler } = require('../utils');
const { restoreUser } = require('../../auth');


router.get('/:id(\\d+)', restoreUser, async (req, res) => {
    //find all matched user and recipeid
    const userId = res.locals.user.id
    const recipeId = parseInt(req.params.id, 10);
    const data = await RecipeStatus.findAll({ where: { userId, recipeId }});
    res.json(data);
})


// POST /api/recipes/:id/cooked
router.post('/:id(\\d+)/cooked', asyncHandler( async (req, res) => {
    //prepare all element needed for building data in RecipeStatus
    const userId = res.locals.user.id
    const recipeId = parseInt(req.params.id, 10);
    const statusId = 1;

    //build data in database
    const recipeStatus = await RecipeStatus.create({
        userId,
        recipeId,
        statusId
    })
    res.json(recipeStatus);
}))

// POST /api/recipes/:id/will-cook
router.post('/:id/will-cook', asyncHandler( async (req, res) => {
    const userId = res.locals.user.id
    const recipeId = parseInt(req.params.id, 10);
    const statusId = 2;

    //build data in database
    const recipeStatus = await RecipeStatus.create({
        userId,
        recipeId,
        statusId
    })
    res.json(recipeStatus);
}))

// DELETE /api/recipes/:id/cooked
router.delete('/:id/cooked', asyncHandler( async (req, res) => {
    const userId = res.locals.user.id
    const recipeId = parseInt(req.params.id, 10);
    const statusId = 1;
    const recipeStatus = await RecipeStatus.findOne({ where: { userId, recipeId, statusId } })
    recipeStatus.destroy();
    res.json(recipeStatus)
}))

// DELETE /api/recipes/:id/will-cook
router.delete('/:id/will-cook', asyncHandler( async (req, res) => {
    const userId = res.locals.user.id
    const recipeId = parseInt(req.params.id, 10);
    const statusId = 2;
    const recipeStatus = await RecipeStatus.findOne({ where: { userId, recipeId, statusId } })
    recipeStatus.destroy();
    res.json(recipeStatus)
}))


//------------------------------------------------------

// PUT /api/recipes/:id/cooked
router.put('/:id(\\d+)/cooked', asyncHandler( async (req, res) => {
    //prepare all element needed for searching data in RecipeStatus
    const userId = res.locals.user.id
    const recipeId = parseInt(req.params.id, 10);

    try {
        const updatedRecipe = await RecipeStatus.update({ statusId : 1 }, { where: { userId, recipeId} })
        res.json(updatedRecipe);
    } catch (err) {
        console.log(err)
    }

}))

// PUT /api/recipes/:id/will-cook
router.put('/:id/will-cook', asyncHandler( async (req, res) => {
    //prepare all element needed for searching data in RecipeStatus
    const userId = res.locals.user.id
    const recipeId = parseInt(req.params.id, 10);

   try {
        const updatedRecipe = await RecipeStatus.update({ statusId : 2 }, { where: { userId, recipeId} })
        res.json(updatedRecipe);
   } catch (err) {
       console.log(err)
   }
}))


module.exports = router;
