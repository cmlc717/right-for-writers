const db = require('./database');

const User = require('../models/user');
const Tag = require('../models/tag');
const Post = require('../models/posts');
const Genre = require('../models/genre');
const Comment = require('../models/comment');

Post.belongsTo(User, {as: "Author", foreignKey: "AuthorId"});
Post.belongsTo(User, {as: "Editor", foreignKey: "EditorId"});
Post.belongsToMany(User, {through: "user-likes"});
Post.belongsToMany(User, {through: "user-favorites"});
Post.belongsToMany(User, {through: "user-bookmarks"});
Post.belongsToMany(Tag, {through: "post-tag"});
Post.belongsToMany(Genre, {through: "post-genre"});
Post.hasMany(Comment);

User.hasMany(Post, {as: "Author"});
User.hasMany(Post, {as: "Editor"});
User.hasMany(Comment);

Tag.belongsToMany(Post, {through: "post-tag"});
Genre.belongsToMany(Post, {through: "post-genre"});
Comment.belongsTo(Post);
Comment.belongsTo(User);

module.exports = {
    db,
    models: {
        User, 
        Post
    }
}