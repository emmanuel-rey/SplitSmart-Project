const express = require('express');
const router = express.Router();
const { registerUser } = require('../Controllers/userController');

// POST /api/users
router.post('/register', registerUser);

module.exports = router;
