const Sequelize = require('sequelize');
const db = require('../db/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios');
require("dotenv").config();


const SALT_ROUNDS = 5;

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isAlphanumeric: true
    }
  },
  password: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  dob: {
    type: Sequelize.DATE,
    validate: {
      isDate: true, 
    }
  },
  age: {
    type: Sequelize.INTEGER,
    validate: {
      min: 18
    }
  },
  editor: {
    type: Sequelize.BOOLEAN
  },
  writer: {
    type: Sequelize.BOOLEAN
  }
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
}

User.prototype.generateToken = function() {
  return jwt.sign({id: this.id}, process.env.JWT);
}

/**
 * classMethods
 */
User.authenticate = async function({ username, password }){
    const user = await this.findOne({where: { username }});
    if (!user || !(await user.correctPassword(password))) {
      const error = Error('Incorrect username/password');
      error.status = 401;
      throw error;
    }
    return user.generateToken();
};

User.findByToken = async function(token) {
  try {
    const {id} = await jwt.verify(token, process.env.JWT);
    const user = User.findByPk(id);
    if (!user) {
      throw 'nooo';
    }
    return user
  } catch (ex) {
    const error = Error('bad token');
    error.status = 401;
    throw error;
  }
}

/**
 * hooks
 */
const hashPassword = async(user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
}

User.beforeCreate(async (user, option) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});
User.beforeUpdate(hashPassword);
