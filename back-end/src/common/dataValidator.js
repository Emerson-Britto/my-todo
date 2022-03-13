const accountManager = require('../controllers/accountManager');

const validator = async (userData) => {
	const pwdExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%#*?&]{8,}$/
	const errors = [
		Object.keys(userData).length === 0,
		userData.name.length > 14 || userData.name.length < 4,
		userData.lastName.length > 14 || userData.lastName.length < 4,
		userData.displayName.length > 14 || userData.displayName.length < 4,
		userData.birthDate.length < 10,
		userData.mail.length > 34 || userData.mail.length < 8,
		await accountManager.dataExists({ mail: userData.mail }),
		userData.password.length > 30 || userData.password.length < 8,
		!pwdExp.test(userData.password),
		userData.password !== userData.rePassword
	]

  const hasSomeEvenError = errors.some(test => test === true);
  return hasSomeEvenError;
}

module.exports = validator;
