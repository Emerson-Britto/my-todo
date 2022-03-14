const accountManager = require('../../controllers/accountManager');
const taskManager = require('../../controllers/taskManager');

const updateTask = async(req, res) => {
	try {
		const account = await accountManager.getByMail(req.userMail);
		await taskManager.update(account.id, req.body);		
	} catch (err) {
		console.error(err);
		res.status(417).json({ msg: 'Unable to remove data' })
	}

};

module.exports = updateTask;
