const Model = require('../models/taskModel');
const { InvalidArgumentError } = require('../common/error');

module.exports = {
  getList() {
    return Model.findAll({ raw: true });
  },
  add(userId, task) {
    if (!userId) throw new InvalidArgumentError('userId is undefined!');
    if (!task) throw new InvalidArgumentError('task is undefined!');
    task.accountId = userId;
    return Model.create(task);
  },
  async getByDue(userMail, due) {
    const task = await Model.findAll({
      where: {
        userMail: userMail,
        due: due
      }
    });
    if (!task) {
      throw new InvalidArgumentError('No Found Task with this Due!');
    }
    return task;
  },
  async getByMail(userMail) {
    const tasks = await Model.findAll({ where: { userMail: userMail }});
    if(tasks) return tasks;
    throw new InvalidArgumentError('No Found data with this mail!');
  },
  async update(userId, update) {
    try {
      await Model.update(update, { where: { accountId: Number(userId) }});
    } catch(error) {
      console.error(error);
      throw new InvalidArgumentError('Data has not been updated!');
    }
  },
  removeTask(userMail, id) {
    return Model.destroy({
      where: {
        userMail: userMail,
        id: Number(id)
      }
    });
  }
}
