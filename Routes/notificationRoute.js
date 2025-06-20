import express from 'express';
import { getMyNotifications, markAsRead } from '../Controllers/notificationController.js';
import { authMiddleware } from '../Middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getMyNotifications);
router.put('/:id/read', authMiddleware, markAsRead);

export default router;
