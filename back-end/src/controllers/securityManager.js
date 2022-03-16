const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const redisDB = require('../common/redisDB');
const { InvalidArgumentError } = require('../common/error');

// "SECRET KEY" :)
const KEY = 'NORDLY_g9hZavvn3-1aWlkYiI6NiwiaWF0IjoxNjM4MjUwOTY-mU8okIbCuHuYwcrQwx9AAjX';

module.exports = {
    async getHash(data) {
        const cost = 12;
        return await bcrypt.hash(data, cost);
    },

    async compareHash(data, dataHash) {
        return await bcrypt.compare(data, dataHash);
    },

    async createAccessToken({ mail }, deviceData) {
        console.log(mail);
        const payload = {
            mail: mail
        };
        const token = jwt.sign(payload, KEY);
        const expireat = moment().add(15, 'd').unix();
        deviceData.lastAccess = moment().unix();
        await redisDB.set(token, JSON.stringify(deviceData));
        redisDB.expiresAt(token, expireat);
        return token;
    },

    async getAccessTokenData(token){
        return redisDB.get(token);
    },

    async createTempCode(mail, temp=15, min=100000, max=999999) {
        if (!mail) {
            throw new InvalidArgumentError('mail is required!');
        }
        let code = Math.floor(Math.random() * (max - min) + min); // ex: 453785
        await redisDB.set(mail, code);
        const expireat = moment().add(temp, 'm').unix();
        redisDB.expiresAt(mail, expireat);
        return code;
    },

    async isValidTempCode(mail, code) {
        let dbCode = await redisDB.get(mail);
        if (dbCode === null) {
            throw new InvalidArgumentError('Code expired or never existed!');
        }
        if (dbCode == code) {
            await redisDB.del(mail);
            return true;
        }
        return false;
    },

    async updateTokenLastSeen(token) {
        let deviceData = redisDB.get(token);
        deviceData.lastAccess = moment().unix();
        await redisDB.set(token, deviceData);
        const expireat = moment().add(15, 'd').unix();
        redisDB.expireAt(token, expireat);
    },

    async deleteToken(token) {
        return redisDB.del(token);
    },

    decoderToken(token) {
        return jwt.verify(token, KEY);
    },

    isActiveToken(token) {
        return redisDB.exists(token);
    },

    async verifyAccessToken(token) {
        const isActive = await this.isActiveToken(token);
        if (isActive != 0) return this.decoderToken(token);
        throw new InvalidArgumentError('invalid token!');
    },

    async isAuthorized(req, res, next) {
        try {
            const { authorization=null } = req.headers;
            const tokenData = await this.verifyAccessToken(
                authorization.replace(/^Bearer\s/i, '')
            );
            req.userMail = tokenData.mail;
            next();
        } catch(err) {
            console.error(err);
            res.status(401).send();
        }
    },

    async revokeInvalidDevices(accountDevices) {
        let devices = JSON.parse(accountDevices);
        devices = await devices.filter(async(device) => await redisDB.exists(device));
        if (devices.length > 4) {
            await this.deleteToken(devices.shift());
        }
        //for(let i=0; i < devices.length; i++) {
        //    let device = devices[i];
        //    const result = await redisDB.exists(device);
        //    if (!result) {
        //        devices = devices.filter(value => value !== device);
        //    }
        //}
        return JSON.stringify(devices);
    },

    async revokeAllDevices(accountDevices) {
        let devices = JSON.parse(accountDevices);
        for(let i=0; i < devices.length; i++) {
            let device = devices[i];
            await this.deleteToken(device);
            devices = devices.filter(value => value !== device);
        }
        return JSON.stringify(devices);
    },
}
