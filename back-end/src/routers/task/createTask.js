const accountManager = require('../../controllers/accountManager');
const taskManager = require('../../controllers/taskManager');

const listAll = async() => {
  console.log(await taskManager.getList());
}
listAll();

const createTask = async(req, res) => {
	try {
		const taskData = req.body;
		const userMail = req.userMail;
		const account = await accountManager.getByMail(userMail);
		taskData.userMail = userMail;
		const taskDataFromDB = await taskManager.add(account.id, taskData);
		res.status(200).send();		
	} catch(err) {
		console.error(err);
		res.status(406).send();
	}
};

module.exports = createTask;
