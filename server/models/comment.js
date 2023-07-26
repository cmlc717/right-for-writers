const Sequelize = require('sequelize');
const db = require('../db/database');

const Comment = db.define('comment', {
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  likes: {
    type: Sequelize.INTEGER,
    validate: {
        min: 0
    }
  }
});

module.exports = Comment;