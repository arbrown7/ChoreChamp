const router = require('express').Router();
const baseController = require('../controllers');
const usersRoutes = require('./users');

router.get('/', baseController.welcome);

router.use('/users', usersRoutes);



module.exports = router;