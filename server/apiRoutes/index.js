const router = require('express').Router();
const User = require('../models/user');

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (ex) {
    next(ex);
  }
};

router.get('/auth', requireToken, async (req, res, next) => {
  res.send(req.user);
});

router.post('/login', async (req, res, next) => {
    try {
      res.send({ token: await User.authenticate(req.body)}); 
    } catch (err) {
      next(err);
    }
});

router.post('/signup', async (req, res, next) => {
    try {
      const user = await User.create(req.body);
      res.send({token: await user.generateToken()});
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists');
      } else {
        next(err);
      }
    }
});

router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/tags', require('./tags'));
router.use('/genres', require('./genres'));
router.use('/comments', require('./comments'));

router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;