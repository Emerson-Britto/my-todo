const Sequelize = require('sequelize');
const instance = require('../dataBase');
const Accounts = require('./accountModel');

const Tasks = instance.define('task', {
  userMail: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  labels: {
    type: Sequelize.STRING,
    allowNull: false
  },
  checked: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  due: {
    type: Sequelize.STRING,
    allowNull: true
  },
  createAt: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

Tasks.belongsTo(Accounts, {
  constraint: true,
  foreignKey: 'accountId'
})
Accounts.hasMany(Tasks, {
  foreignKey: 'accountId'
})
module.exports = Tasks;