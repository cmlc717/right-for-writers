const router = require('express').Router();
const { models: { User, Post, Comment }} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
    try {
        const comments = await Comment.findAll({
            include: [{model: Post}, {model: User}]
        });
        res.json(comments);
    } catch (err) {
        next(err);
    }
});