import express from 'express';
import protectRoute from '../middleware/protextRoute.js';
import { getMe } from '../controllers/userController.js';
const app = express();

app.get('/', protectRoute, getMe)

export default app