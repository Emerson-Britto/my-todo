require('../dataBase/createTables');
require('../routers/account/authenticationStrategy');

async function resetDB() {
	if (process.env.RESET_DB == 1) {
		const accountManager = require('../controllers/accountManager');
		await accountManager.dropOffAccounts({ force: true });
	}	
}
resetDB();