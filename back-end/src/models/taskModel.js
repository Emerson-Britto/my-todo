const Sequelize = require('sequelize')
const instance = require('../dataBase')

const columns = {
  userMail: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'accounts', // 'accounts' refers to table name
      key: 'mail' // 'id' refers to column name in accounts table
    }
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
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
    allowNull: false
  },
  createAt: {
    type: Sequelize.STRING,
    allowNull: false
  }
}

const options = {
  freezeTableName: true,
  tableName: 'tasks',
  timestamps: true,
}

const Tasks = instance.define('task', columns, options);
Tasks.associate = function(models) {
  Tasks.belongsTo(models.accounts, {
    foreignKey: 'userMail'
  })
};

module.exports = Tasks;