const express = require('express');
const { asyncHandler } = require('../utils');
const { check, validationResult } = require('express-validator');
const db = require('../../db/models');
const { requireAuth, checkPermissionsRecipesRoute } = require('../../auth')

const router = express.Router();

const { Collection } = db;

const collectionNotFound = (id) => {
    const err = Error("Collection not found");
    err.errors = [`Collection with id of ${id} could not be found.`];
    err.title = "Collection not found.";
    err.status = 404;
    return err;
  };

// //v for testing or debugging
// router.get("/", asyncHandler(async (req, res) => {
//     const collectionData = await Collection.findAll();
//     res.json(collectionData);
// }));

//getting collections that the user has
router.get("/", asyncHandler(async (req, res) => {
    const collections = await Collection.findAll({
        where: {
            userId: res.locals.user.id
        },
        order: [
            ['createdAt', 'DESC']
        ]
    });

    res.json(collections);
}))


//getting or viewing indvidual collection
router.get("/:id", asyncHandler(async (req, res) => {

    const collectionId = parseInt(req.params.id)


    const collection = await Collection.findByPk(collectionId, {
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



    checkPermissionsRecipesRoute(collection, res.locals.user);

    const recipes = collection.Recipes

    if(collection) {
        res.json({collection, recipes});
    } else {
        next(collectionNotFound(collectionId))
    }
}));

//to edit _--> js, DOM stuff


const collectionFormValidator = [
    check('collection')
    .exists({checkFalsy: true})
    .withMessage('Please provide a name for your new collection.')
]

//to create new collection
router.post("/", requireAuth, collectionFormValidator, asyncHandler(async (req, res) => {
    const { name } = req.body;
    const userId = res.locals.user.id;

    const newCollection = await Collection.build({
        name: name,
        userId: userId
    });

    const validationErrors = validationResult(req.body);

    if (validationErrors.isEmpty()) {
        await newCollection.save();

        res.json({ newCollection })
    } else {
        const errors = validationErrors.array().map(error => error.msg);
        res.send('Error', { errors });
    }
}));

//change the collection name
router.put("/:id", requireAuth, asyncHandler(async (req, res, next) => {
    const { name } = req.body;
    const collectionId = parseInt(req.params.id);

    const collection = await Collection.findByPk(collectionId);

    checkPermissionsRecipesRoute(collection, res.locals.user);

    if (collection) {
        await collection.update({
            name: name
        })
        res.json({ collection });
    } else {
        next(collectionNotFound(collectionId));
    };

}));

//delete full collection
router.delete("/:id", requireAuth, asyncHandler(async (req, res, next) => {
    const userId = res.locals.user.id;
    const collectionId = parseInt(req.params.id);
    const collection = await Collection.findByPk(collectionId);
    checkPermissionsRecipesRoute(collection, res.locals.user);

    //array of all recipeCollections associated with the collection
    const recipeCollections = await db.RecipeCollection.findAll({
        where: {
            collectionId: collection.id
        }
    });

    if (collection) {
        collection.destroy();
        if (recipeCollections.length > 0) {
            recipeCollections.forEach(recipeCollection => recipeCollection.destroy());
        }
        res.json({message: `Deleted collection`});
    } else {
        next(collectionNotFound(collectionId));
    }
}));



module.exports = router;
