import express from 'express';
import protectRoute from '../middleware/protextRoute.js';
import { getMessage, sendMessage } from '../controllers/messageController.js';

const router = express.Router()

router.get('/get/:id', protectRoute, getMessage)
router.post('/send/:id', protectRoute, sendMessage)

export default router