const mongoose = require('mongoose');
//Tasks Collection: title, description, assignedTo, dueDate, status, recurrence, points

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - taskTitle
 *         - status
 *         - points
 *       properties:
 *         taskTitle:
 *           type: string
 *         taskDesc:
 *           type: string
 *         assignedTo:
 *           type: string
 *         dueDate:
 *           type: date
 *         status:
 *           type: boolean
 *         recurrence:
 *           type: string
 *         points:
 *           type: number
 */

const taskSchema = new mongoose.Schema({
  taskTitle: {
    type: String,
    required: true
  },
  taskDesc: {
    type: String
  },
  assignedTo: {
    type: String
  },
  dueDate: {
    type: Date
  },
  status: {
    type: Boolean,
    required: true
  },
  recurrence: {
    type: String
  },
  points: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('tasks', taskSchema);
