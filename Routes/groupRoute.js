import express from 'express';
// import {createGroup, getGroups, getGroupById, updateGroup, deleteGroup} from '../Controllers/groupController.js';
import { createGroup } from '../Controllers/groupController.js';
import { protect } from '../Middleware/authMiddleware.js';

const router = express.Router();

// Route to create a new group
router.post('/', protect,createGroup);

export default router;