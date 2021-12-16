const express = require('express');
const { asyncHandler } = require('../utils');
const { check, validationResult } = require('express-validator');
const db = require('../../db/models');
const { requireAuth, checkPermissionsRecipesRoute } = require('../../auth')

const router = express.Router();

const { Collection, RecipeCollection } = db;

//add recipe to a collection
router.post('/', asyncHandler(async (req, res) => {
    
}));



//delete recipe from a collection
router.delete('/', asyncHandler(async (req, res) => {

}));

module.exports = router;
