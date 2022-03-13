const accountManager = require('../../controllers/accountManager');
const redisDB = require('../../common/redisDB');

const verifyMail = async(req, res) => {
  try {
		const { mail, code } = req.query;
		let result = await accountManager.verifyAccount(mail, code);
	if(result === false) {
		res.status(403).send();
		return
	}
    res.status(200).send();
  } catch(error) {
  	console.error(error);
  	res.status(410).json({ error });
  }
}

module.exports = verifyMail;
