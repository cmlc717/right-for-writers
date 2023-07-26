const Sequelize = require('sequelize');
const db = require('../db/database');

const Tag = db.define('tag', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

module.exports = Tag;