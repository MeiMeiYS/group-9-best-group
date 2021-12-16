const express = require('express');
const { csrfProtecion, asyncHandler } = require('../utils');
const { check, validationResult } = require('express-validator');
const db = require('../../db/models');
const { requireAuth } = require('../../auth')

const router = express.Router();

const { Collection } = db;

router.get("/", asyncHandler(async (req, res) => {
    const collections = await Collection.findAll()
}))


module.exports = router;
