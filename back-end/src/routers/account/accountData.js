const accountManager = require('./accountManager');
const redisDB = require('../../common/redisDB');
const securityManager = require('../../controllers/securityManager');

const accountData = async(req, res) => {
	const token = req.query['accessToken'];
	const part = req.query['part'];

	let data = {};

	const partList = part.split(',');

    const { uiidb } = await securityManager.verifyAccessToken(token);

    if(partList.includes('currentDevice')) {
    	data['currentDevice'] = JSON.parse(await redisDB.get(token));
    }
    if(partList.includes('account')) {
    	let {
    		name,
    		lastName,
    		gender,
    		birthDate,
    		displayName,
    		mail,
    		lastSeen
    	} = await accountManager.getById(Number(uiidb));
    	data['account'] = {name, lastName, gender, birthDate, displayName, mail, lastSeen};
    }
    if(partList.includes('allDevices')) {
    	data['allDevices'] = await accountManager.listDevices({id: Number(uiidb)});
    }

    res.status(200).json(data);
}

module.exports = accountData