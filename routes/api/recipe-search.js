const express = require('express');
const router = express.Router();
const { Sequelize } = require('../../db/models');
const db = require('../../db/models');
const { asyncHandler } = require('../utils');
const Op = Sequelize.Op;
const e = require('express');
const { Image, Recipe,  User, } = db;


router.post('/', asyncHandler(async (req, res) => {
    let searchTerm = req.body.searchTerm

    const foundRecipes = await Recipe.findAll({
        include: [Image, User],
        where: {
            name: {
                [Op.iLike]: `%${searchTerm}%`
            }
        },
        order: [
            [`name`, 'ASC']
        ]
    });

    res.send({foundRecipes})
    // get rating here and pass it in res.render object vvvvvv
    // res.render('recipes', { recentRecipes });

}));

module.exports = router;
