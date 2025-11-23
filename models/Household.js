const mongoose = require('mongoose');
//Households Collection: name, address, members, joinCode, createdBy

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - name
 *         - joinCode
 *         - createdBy
 *       properties:
 *         householdName:
 *           type: string
 *         address:
 *           type: string
 *         members:
 *           type: array
 *         joinCode:
 *           type: string
 *         createdBy:
 *           type: string
 */

const householdSchema = new mongoose.Schema({
  householdName: {
    type: String,
    required: true
  },
  adress: {
    type: String
  },
  members: {
    type: Array
  },
  joinCode: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('households', householdSchema);
