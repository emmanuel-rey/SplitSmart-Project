import express from 'express';
// import {createGroup, getGroups, getGroupById, updateGroup, deleteGroup} from '../Controllers/groupController.js';
import { getGroupById } from '../Controllers/groupController.js';
import { createGroup } from '../Controllers/groupController.js';
import { protect } from '../Middlewares/authMiddleware.js';


const router = express.Router();


// swagger documentation for group creation

/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: Group management
 */

/**
 * @swagger
 * /api/groups:
 *   post:
 *     summary: Create a new group
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []  # ✅ lowercase and matches your Swagger config
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Trip to Abuja
 *               description:
 *                 type: string
 *                 example: Expense group for our Abuja trip
 *               members:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [ "user1@gmail.com", "user2@gmail.com" ]
 *     responses:
 *       201:
 *         description: Group created successfully
 *       400:
 *         description: Group name already exists
 *       401:
 *         description: Unauthorized (invalid/missing token)
 *       500:
 *         description: Error creating group
 */

/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: Get all groups the authenticated user belongs to
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of groups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   members:
 *                     type: array
 *                     items:
 *                       type: string
 *                   createdBy:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/groups/{id}:
 *   get:
 *     summary: Get a single group by ID
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Group ID
 *     responses:
 *       200:
 *         description: Group details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 members:
 *                   type: array
 *                   items:
 *                     type: string
 *                 createdBy:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Group not found
 *       401:
 *         description: Unauthorized
 */


// Route to create a new group
router.post('/', protect,createGroup);


// Route to get a single group by ID
router.get('/', protect, getGroupById);



export default router;
