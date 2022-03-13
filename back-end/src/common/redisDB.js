const { promisify } = require('util');
const redis = require('redis');

const redisDB = redis.createClient('redis://redis-11669.c267.us-east-1-4.ec2.cloud.redislabs.com:11669', {
    password: 'j6RHrm7BXE4kDhspECgYGore5d2E1p8M'
});

module.exports = {
	set: promisify(redisDB.set).bind(redisDB),
	exists: promisify(redisDB.exists).bind(redisDB),
	get: promisify(redisDB.get).bind(redisDB),
	del: promisify(redisDB.del).bind(redisDB),
	expiresAt: (key, temp) => (redisDB.expireat(key, temp)),
};