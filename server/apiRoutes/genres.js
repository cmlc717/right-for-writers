const router = require('express').Router();
const { models: { Genre }} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
    try {
        const genres = await Genre.findAll();
        res.json(genres);
    } catch (err) {
        next(err);
    }
});

router.get('/:genreId', async (req, res, next) => {
    try {
        const genre = await Genre.findByPk(req.params.genreId);
        res.json(genre)
    } catch (err) {
        next(err);
    }
});