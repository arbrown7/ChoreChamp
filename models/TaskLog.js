const mongoose = require('mongoose');
//Users Collection: taskId, completedBy, completionDate, notes, verified

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - taskId
 *         - completedBy
 *         - completionDate
 *         - verified
 *       properties:
 *         taskId:
 *           type: string
 *         completedBy:
 *           type: string
 *         completionDate:
 *           type: string
 *         notes:
 *           type: string
 *         verified:
 *           type: boolean
 */

const taskLogSchema = new mongoose.Schema({
    taskId: {
    type: String,
    required: true
    },
    completedBy: {
    type: String,
    required: true
    },
    completionDate: {
    type: String,
    required: true
    },
    notes: {
    type: String
    },
    verified: {
    type: Boolean,
    required: true
    }
});

module.exports = mongoose.model('taskLog', taskLogSchema);
