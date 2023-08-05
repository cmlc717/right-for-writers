const router = require('express').Router();
const { models: { User, Post, Tag, Genre}} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
    try {
        const posts = await Post.findAll();
        res.json(posts);
    } catch (err) {
        next(err);
    }
});

router.get('/byPostId/:postId', async (req, res, next) => {
    try {
        const post = await Post.findByPk(req.params.postId, {include: [{model: User, as: "Author", attributes: ['username', 'email', 'editor', 'writer']},{model: User, as: "Editor", attributes: ['username', 'email', 'editor', 'writer']}, {model: Tag}, {model: Genre}]});
        res.json(post);
    } catch (err) {
        next(err);
    }
});

router.get('/byUserId/:userId', async (req, res, next) => {
    try {
        const userPosts = await Post.findAll({where: {AuthorId: req.params.userId}, include: [{model: Tag}, {model: Genre}]});
        res.json(userPosts);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        let post = await Post.create(req.body);
        const [user, userWasCreated] = await User.findOrCreate({
            where: {
                name: req.body.name,
                email: req.body.email
            }
        });    

        await post.setAuthor(user);

        const tagList = req.body.tags.split(' '); 
        const tags = await Promise.all(tagList.map(async (tagName) => {
            const [tag, wasCreated] = await Tag.findOrCreate({
                where: { 
                    name: tagName
                } 
            }); 
            return tag;
        }));
        await post.addTags(tags)

        const [genre, genreWasCreated] = await Genre.findOrCreate({
            where: {
                name: req.body.genre,
            }
        });
        await post.addGenre(genre);

        res.json(post);
    } catch (err) {
      next(err);
    }
});

router.put('/:postId', async (req, res, next) => {
    try {
        const post = await Post.findByPk(req.params.postId, {include: [{model: Tag}, {model: Genre}]});
        let oldTags = post.tags;
        let oldGenre = post.genres;
        await post.update(req.body);

        await post.removeTags()
        const tagList = req.body.tags.split(' '); 
        const tags = await Promise.all(tagList.map(async (tagName) => {
            const [tag, wasCreated] = await Tag.findOrCreate({
                where: { 
                    name: tagName
                } 
            }); 
            return tag;
        }));
        await post.updateTags(tags)

        const [genre, genreWasCreated] = await Genre.findOrCreate({
            where: {
                name: req.body.genre,
            }
        });
        await post.updateGenre(genre);

        res.json(post);
    } catch (err) {
        next(err);
    }
});