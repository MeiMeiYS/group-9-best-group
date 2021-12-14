const express = require('express');

const router = express.Router();

// /reviews
// these routes will be API, res will we be sent in json format 
router.get('/', (req, res) => {
    res.send('you have reached /reviews')
})

router.post('/', (req, res) => {
    res.send('you have reached /reviews POST')
})

// /reviews/:id
// these routes will be API, res will we be sent in json format

router.get('/:id', (req, res) => {
    res.send('you have reached /reviews/:id')
})

router.put('/:id', (req, res) => {
    res.send('you have PUT /reviews/:id')
})


router.delete('/:id', (req, res) => {
    res.send('you have DELETED /reviews/:id')
})


module.exports = router;
