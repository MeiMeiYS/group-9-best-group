const express = require('express');
const { asyncHandler } = require('../utils');
const { check, validationResult } = require('express-validator');
const db = require('../../db/models');
const { requireAuth } = require('../../auth')

const router = express.Router();

const { Collection } = db;

//v for testing or debugging
router.get("/", asyncHandler(async (req, res) => {

}));

//v for getting indvidual collection
router.get("/:id", asyncHandler(async (req, res) => {
    const collectionId = parseInt(req.params.id)
    const collection = await Collection.findByPk(collectionId, {
        include: [
            {
                model: db.Recipe,
            }
        ]
    });
    console.log(collection); 
    res.json(collection);
}));

//to edit _--> js, DOM stuff

router.put("/:id", asyncHandler(async (req, res) => {

}));

router.delete("/:id", asyncHandler(async (req, res) => {

}));



module.exports = router;
