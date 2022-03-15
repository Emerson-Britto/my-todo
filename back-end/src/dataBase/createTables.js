const models = [
    require('../models/accountModel'),
    require('../models/taskModel')
];

console.log('CREATING TABLES');

async function createTable() {
    for (let counter = 0; counter < models.length; counter++) {
        const model = models[counter];
        await model.sync({ force: false });
    }
}

module.exports = createTable();
