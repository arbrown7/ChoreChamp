const router = require('express').Router();
const baseController = require('../controllers');
const usersRoutes = require('./users');
const taskLogsRoutes = require('./taskLogs');

router.get('/', baseController.welcome);

router.use('/users', usersRoutes);
router.use('/tasklogs', taskLogsRoutes);

module.exports = router;