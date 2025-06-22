import express from 'express';
import { sendGroupInvite, acceptGroupInvite } from '../Controllers/inviteController.js';


const router = express.Router();

router.post('/group/:groupId/invite', sendGroupInvite);
router.get('/accept', acceptGroupInvite);

export default router;
