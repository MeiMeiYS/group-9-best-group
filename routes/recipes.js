const express = require('express');

const router = express.Router();

// /recipes/new

router.get('/new', (req, res) => {
    res.send('you are now on /recipes/new')
})



// /recipes/:id/edit

router.get('/:id/edit', (req, res) => {
    res.send('you are now on /recipes/:id/edit')
})

// /recipes/:id

router.get('/:id', (req, res) => {
    res.send('you are now on /recipes/:id')
})

router.post('/:id', (req, res) => {
    res.send('you are now on /recipes/:id POST')
})

// /recipes

router.get('/', (req, res) => {
    res.send('you are now on /recipes')
})

router.post('/', (req, res) => {
    res.send('you are now on /recipes POST')
})

//please check and add any extra needed routes

module.exports = router;
