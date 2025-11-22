const router = require('express').Router();
const taskLogsController = require('../controllers/taskLogs');

/**
 * @swagger
 * tags:
 *   name: TaskLogs
 *   description: TaskLogs management endpoints
 */

/**
 * @swagger
 * /tasklogs:
 *   get:
 *     summary: Get all task logs
 *     tags: [TaskLogs]
 *     responses:
 *       200:
 *         description: List of task logs
 *
 *   post:
 *     summary: Create a new task log
 *     tags: [TaskLogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: string
 *               completedBy:
 *                 type: string
 *               completionDate:
 *                 type: string
 *                 format: date-time
 *               notes:
 *                 type: string
 *               verified:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Task log created
 */

/**
 * @swagger
 * /tasklogs/{id}:
 *   get:
 *     summary: Get a task log by ID
 *     tags: [TaskLogs]
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
 *     tags: [TaskLogs]
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
 *               taskId:
 *                 type: string
 *               completedBy:
 *                 type: string
 *               completionDate:
 *                 type: string
 *                 format: date-time
 *               notes:
 *                 type: string
 *               verified:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task log updated
 *
 *   delete:
 *     summary: Delete a task log by ID
 *     tags: [TaskLogs]
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

router.get('/', taskLogsController.getAllTaskLogs);
router.post('/', taskLogsController.createTaskLog);
router.get('/:id', taskLogsController.getTaskLogById);
router.put('/:id', taskLogsController.updateTaskLogById);
router.delete('/:id', taskLogsController.deleteTaskLogById);

module.exports = router;
