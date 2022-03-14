const deleteTask = async(req, res) => {
	try {
		const { id } = req.params;
		await taskManager.removeTask(req.userMail, id);		
	} catch(err) {
		console.error(err);
		res.status(417).json({ msg: 'Unable to remove data' });
	}
};

module.exports = deleteTask;
