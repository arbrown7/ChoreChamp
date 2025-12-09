const mongoose = require('mongoose');
//Users Collection: name, email, houseHold, role, avatar, points, preferredTasks

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - role
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *         household:
 *           type: string
 *         avatar:
 *           type: string
 *         points:
 *           type: number
 *         preferredTasks:
 *           type: array
 */

const userSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true
    },
    email: {
    type: String,
    required: true
    },
    houseHold: {
    type: String
    },
    role: {
    type: String,
    required: true
    },
    avatar: {
    type: String
    },
    points: {
    type: Number,
    default: 0
    },
    preferredTasks: {
    type: Array
    }
});

module.exports = mongoose.model('users', userSchema);
