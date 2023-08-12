const router = require('express').Router();
const { models: { User }} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username']
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: ['username', 'email', 'editor', 'writer']
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId/likes', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: ['username', 'email', 'editor', 'writer'], include: {model: Post, as: "Liked"}
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId/favorites', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: ['username', 'email', 'editor', 'writer'], include: {model: Post, as: "Favorited"}
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId/bookmarks', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: ['username', 'email', 'editor', 'writer'], include: {model: Post, as: "Bookmarked"}
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    await user.update(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});