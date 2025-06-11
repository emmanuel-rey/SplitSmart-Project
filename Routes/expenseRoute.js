import express from 'express';
import {
    addExpense,
    getExpensesByGroup
} from '../controllers/expenseController.js';

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
 * /api/expenses:
 *   post:
 *     summary: Add a new expense
 *     tags: [Expenses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - groupId
 *               - amount
 *               - paidBy
 *             properties:
 *               groupId:
 *                 type: string
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *               paidBy:
 *                 type: string
 *               splitBetween:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Expense added
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/expenses/{groupId}:
 *   get:
 *     summary: Get all expenses for a group
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: Group ID
 *     responses:
 *       200:
 *         description: List of expenses
 */



// POST: Add a new expense
router.post('/:groupId', addExpense);

// GET: Get all expenses for a group
router.get('/:groupId', getExpensesByGroup);

export default router;
