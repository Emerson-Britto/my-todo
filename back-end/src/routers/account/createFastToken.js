const faker = require('faker');
const moment = require('moment');
const redisDB = require('../../common/redisDB');
const securityManager = require('../../controllers/securityManager');
const authorizedServices  = require('../../common/authorizedServices');
const ShortCutUrl = require('../../common/shortcutUrl');
const { InvalidService } = require('../../common/error');

const createFastToken = async(req, res) => {
    try {
		const { accessToken, afterUrl } = req.query;

		const hasSomeAuthorization = authorizedServices
			.some(service => service.test(ShortCutUrl.normalizeUrl(afterUrl)));

		if (!hasSomeAuthorization) throw new InvalidService('invalid service!');

		await securityManager.verifyAccessToken(accessToken);
		let key = faker.datatype.uuid() + '-tmpKey-' + faker.datatype.uuid();
		let expireat = moment().add(1, 'm').unix();
		await redisDB.set(key, accessToken);
		redisDB.expiresAt(key, expireat);

	    res.status(200).send({ KEY: key });
    } catch(error) {
    	console.error(error);
    	res.status(401).json({ error });
    }
}

module.exports = createFastToken
//localhost:8080/sso?after=web-musikyP3%vercelP3%app