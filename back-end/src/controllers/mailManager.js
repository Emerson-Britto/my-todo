const { VerificationMail } = require('../mailer/verificationMail');
const securityManager = require('./securityManager');


module.exports = {
    async sendVerificationMail(mail) {
        let code = await securityManager.createTempCode(mail);
        const verificationMail = new VerificationMail({ mail, code });
        await verificationMail.sendMail().catch(console.warn);
    },
}
