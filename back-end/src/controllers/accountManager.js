const Model = require('../models/accountModel');
const moment = require('moment');
const securityManager = require('./securityManager');
const redisDB = require('../common/redisDB');
const { InvalidArgumentError } = require('../common/error');

module.exports = {

    getList() {
        return Model.findAll({ raw: true });
    },

    add(account) {
        return Model.create(account);
    },

    async verifyAccount(mail, code) {
        let result = await securityManager.isValidTempCode(mail, code);

        if(result === true) {
            await Model.update({ verified: 1 }, { where: { mail: mail }})
            return true
        }
        return false;
    },

    async setDevice({ id, displayName }, deviceData) {
        try {
            const account = await Model.findOne({ where: {id: Number(id)} });
            let currentDevices = JSON.parse(account.devices);

            const accessToken = await securityManager.createAccessToken(
                { id, displayName },
                deviceData
            );
            let devices = JSON.stringify([ ...currentDevices, accessToken ]);

            await Model.update({ devices }, { where: { id: Number(id) }});
            return accessToken;
        } catch(error) {
            console.error(error);
            throw new InvalidArgumentError('Devices has not been added!');
        }
    },

    async listDevices({ id=false, mail=false }) {

        if(!id && !mail) return;

        let account = {};

        if(id) {
            account = await Model.findOne({ where: {id: Number(id)} });
        }
        if(mail && !id) {
            account = await Model.findOne({ where: {mail: Number(mail)} });
        }

        const devices = JSON.parse(account.devices);
        let devicesListData = [];

        for(let i=0; i < devices.length; i++) {
            devicesListData.push(JSON.parse(await redisDB.get(devices[i])));
        }

        return devicesListData;
    },

    async removeDevice({ id }, accessToken) {
        try {
            const account = await Model.findOne({ where: {id: Number(id)} });
            let currentDevices = JSON.parse(account.devices);

            await securityManager.deleteToken(accessToken);
            let devices = currentDevices.filter(value => value !== accessToken);
            devices = JSON.stringify(devices);

            await Model.update(
                { devices },
                { where: { id: Number(id) }}
            )
        } catch(error) {
            console.error(error);
            throw new InvalidArgumentError('Devices has not been removed!');
        }
    },

    async dataExists({ userName=false, mail=false }) {

        let exists = false;

        if(mail) exists = await Model.findOne({ where: {mail: mail} });
        if(userName) exists = await Model.findOne({ where: {userName: userName} });

        if (!exists) return false;
        
        return true;
    },

    async getById(id) {
        const account = await Model.findOne({ where: {id: Number(id)} });

        if(account) return account;

        throw new InvalidArgumentError('No Found data with this Id!');
    },

    async getByMail(mail) {
        const account = await Model.findOne({ where: {mail: mail} });

        if(account) return account;

        throw new InvalidArgumentError('No Found data with this mail!');
    },

    async update({ id }, update) {
        try {
            await Model.update(update, { where: { id: Number(id) }})
        } catch(error) {
            console.error(error);
            throw new InvalidArgumentError('Data has not been updated!');
        }
    },

    async lastSeen(mail) {
        const account = await Model.findOne({ where: {mail: mail} });
        if(account) {
            throw new InvalidArgumentError('No Found data with this mail!');
        }
        let accountlastSeen = parseInt(account.lastSeen);
        let currentTime = moment().unix();
        return currentTime - accountlastSeen; // seconds ago
    },

    async updateLastSeen(mail) {
        try {
            let newLastSeen = moment().unix();

            await Model.update(
                { lastSeen: newLastSeen },
                { where: { mail: mail }}
            );
        } catch(error) {
            console.error(error);
            throw new InvalidArgumentError("Data has not been updated!");
        }
    },

    remove(id) {
        return Model.destroy({ where: { id: Number(id) } })
    },

    async dropOffAccounts(options={}) {
        let result = redisDB.exists("noVerifyOffAccounts");

        if (result && !options.force) return;

        console.log('>> DROPPING SOME inactive accounts FROM DB...');

        let accountsList = await this.getList();

        for(let i=0; i < accountsList.length; i++) {
            let account = accountsList[i];
            let accountLastSeen = moment().unix() - parseInt(account.lastSeen);
            if (accountLastSeen > (15 * 24 * 60 * 60) || options.force) {
                await securityManager.revokeAllDevices(account.devices);
                this.remove(account.id);
            }
        }

        redisDB.set("noVerifyOffAccounts", "noVerify");
        redisDB.expiresAt("noVerifyOffAccounts", moment().add(30, 'm').unix())
        console.log('>> DROPPING SOME inactive account - FINISHED');
    },
}
