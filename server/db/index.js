const db = require('./database');

const User = require('../models/user');
const Tag = require('../models/tag');
const Post = require('../models/posts');
const Genre = require('../models/genre');
const Comment = require('../models/comment');

Post.belongsTo(User, {as: "Author", foreignKey: "AuthorId"});
Post.belongsTo(User, {as: "Editor", foreignKey: "EditorId"});
User.hasMany(Post, {as: "Author"});
User.hasMany(Post, {as: "Editor"});

module.exports = {
    db,
    models: {
        User, 
        Post
    }
}