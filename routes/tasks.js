const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks');
const { ensureAuthenticated } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management endpoints
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of tasks
 *
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskTitle:
 *                 type: string
 *               taskDesc:
 *                 type: string
 *               assignedTo:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: boolean
 *               recurrence:
 *                 type: string
 *               points:
 *                 type: number
 *     responses:
 *       201:
 *         description: Task created
 */

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Task data
 *
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
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
 *               taskTitle:
 *                 type: string
 *               taskDesc:
 *                 type: string
 *               assignedTo:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: boolean
 *               recurrence:
 *                 type: string
 *               points:
 *                 type: number
 *     responses:
 *       200:
 *         description: Task updated
 *
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Task deleted
 */


router.get('/', ensureAuthenticated, tasksController.getAllTasks);
router.get('/:id', ensureAuthenticated, tasksController.getTaskById);
router.post('/', ensureAuthenticated, tasksController.createTask);
router.put('/:id', ensureAuthenticated, tasksController.updateTaskById);
router.delete('/:id', ensureAuthenticated, tasksController.deleteTaskById);
router.get('/:id/tasklogs', ensureAuthenticated, tasksController.getTaskLogsForTask);

module.exports = router;