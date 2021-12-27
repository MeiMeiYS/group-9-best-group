const express = require('express');
const router = express.Router();
const { Sequelize } = require('../../db/models');
const db = require('../../db/models');
const { RecipeStatus, Recipe, Image, StatusType } = db
const { asyncHandler } = require('../utils');
const Op = Sequelize.Op;
const { restoreUser } = require('../../auth');


router.get('/:id(\\d+)', restoreUser, async (req, res) => {
    //find all matched user and recipeid
    const userId = res.locals.user.id
    const recipeId = parseInt(req.params.id, 10);
    const data = await RecipeStatus.findAll({ where: { userId, recipeId }});
    res.json(data);
})


router.get('/cooked', restoreUser, async (req, res) => {
    //find all matched user
    const userId = res.locals.user.id;
    const statusId = 1;
    const data = await RecipeStatus.findAll({ where: { userId, statusId }});

    //console.log(data);
    let array = [];
    for (let i = 0; i < data.length; i++) {
        let recipeId = data[i].recipeId;
        const recipe = await Recipe.findByPk(recipeId, {
            include: {
                model: Image
            }
        });
        let obj = { recipeId, recipeName: recipe.name, recipeImg: recipe.Image.url};

        array.push(obj);
    }

    res.json(array);
});

router.get('/will-cook', restoreUser, async (req, res) => {
    //find all matched user
    const userId = res.locals.user.id;
    const statusId = 2;
    const data = await RecipeStatus.findAll({ where: { userId, statusId }});

    let array = [];
    for (let i = 0; i < data.length; i++) {
        let recipeId = data[i].recipeId;
        const recipe = await Recipe.findByPk(recipeId, {
            include: {
                model: Image
            }
        });
        let obj = { recipeId, recipeName: recipe.name, recipeImg: recipe.Image.url};

        array.push(obj);
    }

    res.json(array);
});


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
    const userId = res.locals.user.id
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
