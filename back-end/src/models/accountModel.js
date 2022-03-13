const Sequelize = require('sequelize')
const instance = require('../dataBase')

const columns = {
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
}

const options = {
  freezeTableName: true,
  tableName: 'accounts',
  timestamps: true,
}
const Accounts = instance.define('account', columns, options);
Accounts.associate = function(models) {
  Accounts.hasMany(models.tasks, {
    foreignKey: 'userMail'
  })
}
module.exports = Accounts;