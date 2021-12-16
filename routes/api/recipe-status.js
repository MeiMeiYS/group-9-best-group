const express = require('express');
const router = express.Router();
const { Sequelize } = require('../../db/models');
const db = require('../../db/models');
const { RecipeStatus } = db;
const { asyncHandler } = require('../utils');
const Op = Sequelize.Op;


router.get('/', async (req, res) => {
    //prepare all element needed for building data in RecipeStatus
    const data = await RecipeStatus.findAll();
    res.json(data);
})


// POST /api/recipes/:id/cooked
router.post('/:id/cooked', asyncHandler( async (req, res) => {
    //prepare all element needed for building data in RecipeStatus
    // const userId = (need to get from user cookie)
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
    // const userId = (need to get from user cookie)
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
    // const userId = (need to get from user cookie)
    const recipeId = parseInt(req.params.id, 10);
    const statusId = 1;
    const recipeStatus = await RecipeStatus.findOne({
        where: {
            userId: {
                [Op.eq]: userId
            },
            recipeId: {
                [Op.eq]: recipeId
            },
            statusId: {
                [Op.eq]: statusId
            }
        }
    })
    recipeStatus.destroy();
    res.json(recipeStatus)
}))

// DELETE /api/recipes/:id/will-cook
router.delete('/:id/will-cook', asyncHandler( async (req, res) => {
    // const userId = (need to get from user cookie)
    const userId = 1;
    const recipeId = parseInt(req.params.id, 10);
    const statusId = 2;
    const recipeStatus = await RecipeStatus.findOne({
        where: {
            userId: {
                [Op.eq]: userId
            },
            recipeId: {
                [Op.eq]: recipeId
            },
            statusId: {
                [Op.eq]: statusId
            }
        }
    })
    recipeStatus.destroy();
    res.json(recipeStatus)
}))

module.exports = router;
