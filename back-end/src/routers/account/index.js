const router = require('express').Router();
const passport = require('passport');
//const dataAlreadyExists = require('./dataAlreadyExists');
const createAccount = require('./createAccount');
const accessAccount = require('./accessAccount');
//const verifyMail = require('./verifyMail');
//const createFastToken = require('./createFastToken');
//const accessFastToken = require('./accessFastToken');
//const accountData = require('./accountData');
const authenticatonMiddlewares = require('./authenticationMiddlewares');

router.options('/', (req, res) => {
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.status(200);
  res.end();
})

//router
//    .route('/')
//    .get(accountData)

//router
//    .route('/exists')
//    .get(dataAlreadyExists)

//router
//    .route('/verifyMail')
//   .get(verifyMail)

//router
//    .route('/createFastToken')
//    .get(createFastToken)

//router
//    .route('/accessFastToken')
//    .get(accessFastToken)

router
  .route('/create')
  .post(createAccount)

router
  .route('/login')
  .post(authenticatonMiddlewares.local, accessAccount)


module.exports = router;
