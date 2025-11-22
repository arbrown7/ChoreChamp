const router = require('express').Router();
const usersController = require('../controllers/users');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users management endpoints
 */

/**
 * @swagger
 * /Users:
 *   get:
 *     summary: Get all task logs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of task logs
 *
 *   post:
 *     summary: Create a new task log
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               houseHold:
 *                 type: string
 *               role:
 *                 type: string
 *               avatar:
 *                 type: string
 *               points:
 *                 type: string
 *               preferredTasks:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task log created
 */

/**
 * @swagger
 * /Users/{id}:
 *   get:
 *     summary: Get a task log by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Task log data
 *
 *   put:
 *     summary: Update a task log by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               houseHold:
 *                 type: string
 *               role:
 *                 type: string
 *               avatar:
 *                 type: string
 *               points:
 *                 type: string
 *               preferredTasks:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task log updated
 *
 *   delete:
 *     summary: Delete a task log by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Task log deleted
 */

router.get('/', usersController.getAllUsers);
router.post('/', usersController.createUser);
router.get('/:id', usersController.getUserById);
router.put('/:id', usersController.updateUserById);
router.delete('/:id', usersController.deleteUserById);

module.exports = router;