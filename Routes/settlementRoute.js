import express from 'express';
import { calculateDetailedSettlement, settleUp, getGroupSettlements} from '../Controllers/settlementController.js';
import { protect } from '../Middlewares/authMiddleware.js';

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Settlements
 *   description: Settling expenses
 */


/**
 * @swagger
 * /api/settlements/{groupId}/settle:
 *   post:
 *     summary: Record a payment between two users in a group
 *     tags: [Settlements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the group
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fromEmail
 *               - toEmail
 *               - amount
 *               - totalOwed
 *             properties:
 *               fromEmail:
 *                 type: string
 *                 example: "john@example.com"
 *               toEmail:
 *                 type: string
 *                 example: "jane@example.com"
 *               amount:
 *                 type: number
 *                 example: 3000
 *               totalOwed:
 *                 type: number
 *                 example: 10000
 *     responses:
 *       200:
 *         description: Payment recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 settlement:
 *                   type: object
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

// Record a user payment (partial or full)
router.post('/:groupId/settle', protect, settleUp);

/**
 * @swagger
 * /api/settlements/{groupId}/transactions:
 *   get:
 *     summary: Suggest who owes who in a group (based on expenses)
 *     tags: [Settlements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: Group ID
 *     responses:
 *       200:
 *         description: List of suggested settlements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   from:
 *                     type: string
 *                   to:
 *                     type: string
 *                   amount:
 *                     type: number
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

// Suggest who owes who, based on all group expenses
router.get('/:groupId/transactions', protect, calculateDetailedSettlement);

/**
 * @swagger
 * /api/settlements/{groupId}:
 *   get:
 *     summary: Fetch all recorded settlements in a group
 *     tags: [Settlements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the group
 *     responses:
 *       200:
 *         description: List of actual payment settlements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   fromUser:
 *                     type: string
 *                   toUser:
 *                     type: string
 *                   amount:
 *                     type: number
 *                   remainingAmount:
 *                     type: number
 *                   status:
 *                     type: string
 *                     enum: [partial, paid]
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
// Fetch all settlements (actual payments made) for a group
router.get('/:groupId', protect, getGroupSettlements);


export default router;
