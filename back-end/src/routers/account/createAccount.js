const moment = require('moment');
const validator = require('../../common/dataValidator');
const accountManager = require('../../controllers/accountManager');
const securityManager = require('../../controllers/securityManager');
const mailManager = require('../../controllers/mailManager');

listAll = async () => {
    console.log(await accountManager.getList())	;
}
listAll();

const createAccount = async (req, res) => {

	await accountManager.dropOffAccounts();

	const { newUser, deviceData } = req.body;
	let userData = newUser;

	var hasError = await validator(userData);
	if (hasError) {
		res.status(401).json({msg: 'account was denied'})
		return
	};

	delete userData.rePassword;

	userData.passwordHash = await securityManager.getHash(userData.password);
	userData.lastSeen = moment().subtract({ day: 14, hour: 22 }).unix();
	//userData.verified = 0;
	userData.devices = JSON.stringify([]);

	const dbUserData = await accountManager.add(userData);
	//await mailManager.sendVerificationMail(dbUserData.mail);
	res.status(201).send();
}

module.exports = createAccount