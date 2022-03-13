const redisDB = require('../../common/redisDB');
const { InvalidArgumentError } = require('../../common/error');

const createFastToken = async(req, res) => {
    try {
		const { passToken } = req.query;
		if (await redisDB.exists(passToken)) {
			let accessToken = await redisDB.get(passToken);
			res.status(200).send({ ACCESS_TOKEN: accessToken });
		} else {
			throw new InvalidArgumentError('invalid passToken!')
		}
    } catch(error) {
    	console.error(error);
    	res.status(401).json({ error });
    }
}

module.exports = createFastToken;
