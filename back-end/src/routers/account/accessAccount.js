const moment = require('moment');
const accountManager = require('../../controllers/accountManager');
const securityManager = require('../../controllers/securityManager');
const mailManager = require('../../controllers/mailManager');

const accessAccount = async(req, res) => {
	await accountManager.dropOffAccounts();
	const account = req.account;
	const deviceData = /*req.body.deviceData*/ { os: null };

	//if(!account.verified) {
	//	await mailManager.sendVerificationMail(account.mail);
	//	res.status(428).json({ msg: 'account needs to be verified'});
	//	return
	//}

	let activeDevices = await securityManager.revokeInvalidDevices(account.devices);
	let lastSeenUpdated = moment().unix();
	await accountManager.update(account, { activeDevices, lastSeenUpdated });

	let accessToken = await accountManager.setDevice(account, deviceData);

	// também pode ser enviado pelo Header do request;
	res.status(200).send({ACCESS_TOKEN: accessToken});

}

module.exports = accessAccount;
