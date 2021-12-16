const express = require('express');
const { asyncHandler } = require('../utils');
const { check, validationResult } = require('express-validator');
const db = require('../../db/models');
const { requireAuth } = require('../../auth')

const router = express.Router();

const { Collection } = db;

const collectionNotFound = (id) => {
    const err = Error("Collection not found");
    err.errors = [`Collection could not be found.`];
    err.title = "Collection not found.";
    err.status = 404;
    return err;
  };

// //v for testing or debugging
// router.get("/", asyncHandler(async (req, res) => {
//     const collectionData = await Collection.findAll();
//     console.log('~~~~~~',res.locals.user.id)
//     res.json(collectionData);
// }));

//getting or viewing indvidual collection
router.get("/:id", asyncHandler(async (req, res) => {
    const userId = res.locals.user.id;
    const collectionId = parseInt(req.params.id)
    const collection = await Collection.findByPk(collectionId, {
        where: {
            userId: userId
        },
        include: [
            {
                model: db.Recipe,
                include: [
                    {
                      model: db.Tag
                    },
                    {
                      model: db.StatusType
                    },
                    {
                      model: db.Image
                    }

                ]
            }
        ]
    });
    res.json(collection);
}));

//to edit _--> js, DOM stuff


//to create new collection
router.post("/", requireAuth, asyncHandler(async (req, res) => {
    const { name } = req.body;
    
}));


//delete full collection
router.delete("/:id", requireAuth, asyncHandler(async (req, res, next) => {
    const userId = res.locals.user.id;
    const collectionId = parseInt(req.params.id);

    const collection = await Collection.findByPk(collectionId, {
        where: {
            userId: userId
        }
    });
    const recipeCollections = await db.RecipeCollection.findAll({
        where: {
            collectionId
        }
    });

    if (collection) {
        collection.destroy();
        recipeCollections.destroy();
    } else {
        next(collectionNotFound(collectionId))
    }

    res.json(collection);
}));



module.exports = router;
