const accountManager = require('./accountManager');

const dataAlreadyExists = async (req, res) => {

	let { userName=false, mail=false } = req.query;
  let resultName = undefined;
  let resultMail = undefined;

	if (userName) {
		resultName = await accountManager.dataExists({ userName });
	}
	if (mail) {
		resultMail = await accountManager.dataExists({ mail });
	}

	res.status(200).json({'userName': resultName, 'mail': resultMail});
}

module.exports = dataAlreadyExists;
