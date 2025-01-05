import express from 'express';
import { login, logout, register } from '../controllers/control.js';
const router = express.Router();

router.post('/signup', register)
router.post('/login', login)
router.post('/logout', logout)


export default router