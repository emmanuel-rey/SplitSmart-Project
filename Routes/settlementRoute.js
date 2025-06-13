import express from 'express';
import { getSettlementSummary } from '../Controllers/settlementController.js';
import { settleUp } from '../Controllers/settlementController.js';
import { authMiddleware as protect } from '../Middlewares/authMiddleware.js';


// swagger documentation for settlement routes

/**
 * @swagger
 * tags:
 *   name: Settlements
 *   description: Settling expenses
 */

/**
 * @swagger
 * /api/settlements:
 *   post:
 *     summary: Settle up between users
 *     tags: [Settlements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - groupId
 *               - from
 *               - to
 *               - amount
 *             properties:
 *               groupId:
 *                 type: string
 *               from:
 *                 type: string
 *               to:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Settlement recorded
 */

/**
 * @swagger
 * /api/settlements/{groupId}:
 *   get:
 *     summary: Get settlement summary for a group
 *     tags: [Settlements]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: Group ID
 *     responses:
 *       200:
 *         description: Settlement summary
 */


const router = express.Router();

// POST: Settle up between users
router.post('/', protect, settleUp); // this handles POST /api/settlements

// GET: Calculate who owes whom in a group
router.get('/:groupId', getSettlementSummary);

// POST: Mark a payment as settled
router.post('/:groupId/settle', settleUp);

export default router;
