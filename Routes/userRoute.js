import express from 'express';
import { registerUser } from '../Controllers/userController.js';
import { loginUser } from '../Controllers/userController.js';

const router = express.Router();

// POST /api/users
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;

