const router = require('express').Router();
const baseController = require('../controllers');
const usersRoutes = require('./users');
const taskLogsRoutes = require('./taskLogs');
const tasksRoutes = require('./tasks');
const householdsRoutes = require('./households');

router.get('/', baseController.welcome);

router.use('/users', usersRoutes);
router.use('/tasklogs', taskLogsRoutes);
router.use('/tasks', tasksRoutes);
router.use('/households', householdsRoutes);


module.exports = router;