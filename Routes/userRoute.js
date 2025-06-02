import express from 'express';
import { registerUser } from '../Controllers/userController.js';

const router = express.Router();

// POST /api/users
router.post('/register', registerUser);

export default router;
