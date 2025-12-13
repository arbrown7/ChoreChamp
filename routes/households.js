const router = require('express').Router();
const usersController = require('../controllers/households');
const { ensureAuthenticated } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Households
 *   description: Household management endpoints
 */

/**
 * @swagger
 * /households:
 *   get:
 *     summary: Get all households
 *     tags: [Households]
 *     responses:
 *       200:
 *         description: List of households
 *
 *   post:
 *     summary: Create a new household
 *     tags: [Households]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               householdName:
 *                 type: string
 *               address:
 *                 type: string
 *               members:
 *                 type: array
 *                 items:
 *                   type: string
 *               joinCode:
 *                 type: string
 *               createdBy:
 *                 type: string
 *     responses:
 *       201:
 *         description: Household created
 */

/**
 * @swagger
 * /households/{id}:
 *   get:
 *     summary: Get a household by ID
 *     tags: [Households]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Household data
 *
 *   put:
 *     summary: Update a household by ID
 *     tags: [Households]
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
 *               householdName:
 *                 type: string
 *               address:
 *                 type: string
 *               members:
 *                 type: array
 *                 items:
 *                   type: string
 *               joinCode:
 *                 type: string
 *               createdBy:
 *                 type: string
 *     responses:
 *       200:
 *         description: Household updated
 *
 *   delete:
 *     summary: Delete a household by ID
 *     tags: [Households]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Household deleted
 */


router.get('/', ensureAuthenticated, usersController.getAllHouseholds);
router.post('/', ensureAuthenticated, usersController.createHousehold);
router.get('/:id', ensureAuthenticated, usersController.getHouseholdById);
router.put('/:id', ensureAuthenticated, usersController.updateHouseholdById);
router.delete('/:id', ensureAuthenticated, usersController.deleteHouseholdById);

module.exports = router;