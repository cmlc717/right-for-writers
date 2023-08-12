const router = require('express').Router();
const { models: { Post, Genre }} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
    try {
        const genres = await Genre.findAll({
            include: {model: Post}
        });
        res.json(genres);
    } catch (err) {
        next(err);
    }
});

router.get('/:genreId', async (req, res, next) => {
    try {
        const genre = await Genre.findByPk(req.params.genreId, {
            include: {model: Post}
        });
        res.json(genre)
    } catch (err) {
        next(err);
    }
});