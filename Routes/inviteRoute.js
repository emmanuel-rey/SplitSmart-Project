import express from 'express';
import { sendGroupInvite, acceptGroupInvite } from '../Controllers/inviteController.js';
import { protect } from '../Middlewares/authMiddleware.js';


const router = express.Router();

// Swagger documentation for invite routes

/**
 * @swagger
 * tags:
 *   name: Invites
 *   description: Group invitation endpoints
 */

/**
 * @swagger
 * /api/invite/group/{groupId}/invite:
 *   post:
 *     summary: Send an invite email to a user to join a group
 *     tags: [Invites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the group to invite the user to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: "invitee@example.com"
 *     responses:
 *       200:
 *         description: Invite sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invite sent successfully
 *       400:
 *         description: Email is missing or invalid
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/invite/accept:
 *   get:
 *     summary: Accept an invite and join a group
 *     tags: [Invites]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The JWT invite token from the email
 *     responses:
 *       200:
 *         description: Successfully joined the group (returns HTML)
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: "<h2>You’ve joined the group successfully 🎉</h2>"
 *       400:
 *         description: Invalid or expired token
 */


// Route to invite a user to a group

router.post('/group/:groupId/invite', protect, sendGroupInvite);
router.get('/accept', acceptGroupInvite);


export default router;
