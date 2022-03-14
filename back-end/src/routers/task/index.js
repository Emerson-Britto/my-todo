const router = require('express').Router();
const securityManager = require('../../controllers/securityManager');
const createTask = require('./createTask');
const taskList = require('./taskList');
const updateTask = require('./updateTask');
const deleteTask = require('./deleteTask');
router.options('/', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(200)
    res.end()
})

router
  .route('/create')
  .post(securityManager.isAuthorized.bind(securityManager), createTask)

router
  .route('/all')
  .get(securityManager.isAuthorized.bind(securityManager), taskList)

router
  .route('/:id')
//  .get(taskData)
  .post(securityManager.isAuthorized.bind(securityManager), updateTask)
  .delete(securityManager.isAuthorized.bind(securityManager), deleteTask)

module.exports = router;
