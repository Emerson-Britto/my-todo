const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const accountManager = require('../../controllers/accountManager')
const securityManager = require('../../controllers/securityManager')
const { InvalidArgumentError } = require('../../common/error');

passport.use(
    new LocalStrategy(
        {
            usernameField: 'mail',
            passwordField: 'password',
            session: false,
        },
        async (mail, password, done) => {
            try {
                const account = await accountManager.getByMail(mail);
                const validPassword = await securityManager
                    .compareHash(password, account.passwordHash)

                if(!validPassword) throw new InvalidArgumentError('invalid password!!')

                done(null, account);
            } catch (error) {
                console.error(error);
                done({ name: "InvalidArgumentError", msg: "invalid mail or password" });
            }
        }
    )
);

passport.use(
    new BearerStrategy(async (token, done) => {

        try {
            const { id } = await securityManager.verifyAccessToken(token);
            const account = await accountManager.getById(id);
            done(null, account, { token });
        } catch (error) {
            done(error);
        }
    })
);