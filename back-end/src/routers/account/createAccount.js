const moment = require('moment');
const validator = require('../../common/dataValidator');
const accountManager = require('../../controllers/accountManager');
const securityManager = require('../../controllers/securityManager');
const mailManager = require('../../controllers/mailManager');

const listAll = async () => {
    console.log(await accountManager.getList());
}
listAll();

const createAccount = async (req, res) => {

	await accountManager.dropOffAccounts();

	const { newUser=null, deviceData=null } = req.body;
	if (!newUser || !newUser.rePassword) {
		console.error('invalid form');
		res.status(403).json({ msg: 'invalid form!' });
		return;
	};
	let userData = newUser;

	const hasError = await validator(userData);
	if (hasError) {
		console.error('account was denied');
		res.status(401).json({msg: 'account was denied'});
		return;
	};

	delete userData.rePassword;

	userData.passwordHash = await securityManager.getHash(userData.password);
	userData.lastSeen = moment().subtract({ day: 14, hour: 22 }).unix();
//	userData.verified = 0;
	userData.devices = JSON.stringify([]);

	const dbUserData = await accountManager.add(userData);
//	await mailManager.sendVerificationMail(dbUserData.mail);
	res.status(201).send();
}

module.exports = createAccount