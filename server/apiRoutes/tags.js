const router = require('express').Router();
const { models: { Tag }} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
    try {
        const tags = await Tag.findAll();
        res.json(tags);
    } catch (err) {
        next(err);
    }
});

router.get('/:tagId', async (req, res, next) => {
    try {
        const tag = await Tag.findByPk(req.params.tagId);
        res.json(tag)
    } catch (err) {
        next(err);
    }
});