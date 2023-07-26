const Sequelize = require('sequelize');
const db = require('../db/database');

const Post = db.define('post', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  postDate: {
    type: Sequelize.DATE,
    validate: {
        isDate: true, 
    }
  },
  editDate: {
    type: Sequelize.DATE,
    validate: {
        isDate: true, 
    }
  },
  views: {
    type: Sequelize.INTEGER
  },
  inProgress: {
    type: Sequelize.BOOLEAN,
  }
});

module.exports = Post;