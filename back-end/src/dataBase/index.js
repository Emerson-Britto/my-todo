const Sequelize = require('sequelize');
const config = require('config');

const instance = new Sequelize(config.get('mysql.connectionString'));

module.exports = instance;
