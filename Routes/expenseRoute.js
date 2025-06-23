import express from 'express';
import { addExpense } from '../Controllers/expenseController.js';
import { getExpensesByGroup } from '../Controllers/expenseController.js';
import { protect } from '../Middlewares/authMiddleware.js';

const router = express.Router();



// swagger documentation for expense routes

/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: Expense tracking
 */

/**
 * @swagger
 * /api/expenses/{groupId}:
 *   post:
 *     summary: Add a new expense to a group
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the group the expense belongs to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - paidBy
 *               - splitAmong
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 5000
 *               description:
 *                 type: string
 *                 example: Lunch at The Place
 *               paidBy:
 *                 type: string
 *                 example: user1@example.com
 *               splitAmong:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [ "user1@example.com", "user2@example.com" ]
 *     responses:
 *       201:
 *         description: Expense added successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Group not found
 */

/**
 * @swagger
 * /api/expenses/{groupId}:
 *   get:
 *     summary: Get all expenses for a group
 *     tags: [Expenses]
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
 *         description: List of expenses
 *       404:
 *         description: Group not found
 */



// Middleware to protect routes
router.use('/:groupId', protect);


// POST: Add a new expense
router.post('/:groupId', addExpense);

// GET: Get all expenses for a group
router.get('/:groupId', getExpensesByGroup);

export default router;

