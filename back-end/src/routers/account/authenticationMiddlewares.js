const passport = require('passport');
const { InvalidArgumentError } = require('../../common/error');

module.exports = {
	local(req, res, next) {
		passport.authenticate('local', { session: false }, (error, account, infor) => {
			if (error && error.name === 'InvalidArgumentError') {
      	return res.status(401).json({ error });
    	}
      if (error) {
        return res.status(500).json({ error });
      }
      if (!account) {
        return res.status(401).json({error: 'undefined account'});
      }
      req.account = account;
    	return next();
		})(req, res, next);
	}
}