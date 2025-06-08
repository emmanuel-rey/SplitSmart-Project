import express from 'express';
// import {createGroup, getGroups, getGroupById, updateGroup, deleteGroup} from '../Controllers/groupController.js';
import { createGroup } from '../Controllers/groupController.js';
import { authMiddleware as protect } from '../Middlewares/authMiddleware.js';

const router = express.Router();


/**
 * @swagger
 * /api/groups:
 *   post:
 *     summary: Create a new group
 *     tags: [Groups]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       201:
 *         description: Group created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       400:
 *         description: Group name already exists
 *       401:
 *         description: Unauthorized (invalid/missing token)
 *       500:
 *         description: Error creating group
 */

// Route to create a new group
router.post('/', protect,createGroup);

export default router;
