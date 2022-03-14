const taskManager = require('../../controllers/taskManager');

const taskList = async(req, res) => {
	const { due=null } = req.query;
	if (due) {
		const tasks = await taskManager.getByDue(req.userMail, due);
		res.status(200).json(tasks);
		return;
	};
	const tasks = await taskManager.getByMail(req.userMail);
	res.status(200).json(tasks);
};

module.exports = taskList;
