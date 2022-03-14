const Sequelize = require('sequelize')
const instance = require('../dataBase')

const Accounts = instance.define('account', {
  mail: {
    type: Sequelize.STRING,
    allowNull: false
  },
  passwordHash: {
    type: Sequelize.STRING,
    allowNull: false
  },
//    name: {
//        type: Sequelize.STRING,
//        allowNull: false
//    },
//    lastName: {
//        type: Sequelize.STRING,
//        allowNull: false
//    },
//    gender: {
//        type: Sequelize.STRING,
//        allowNull: false
//    },
//    birthDate: {
//        type: Sequelize.STRING,
//        allowNull: false
//    },
//    displayName: {
//        type: Sequelize.STRING,
//        allowNull: false
//    },
  lastSeen: {
    type: Sequelize.STRING,
    allowNull: false
  },
//    verified: {
//        type: Sequelize.BOOLEAN,
//        allowNull: false
//    },
  devices: {
    type: Sequelize.JSON,
    allowNull: false
  }
})

module.exports = Accounts;