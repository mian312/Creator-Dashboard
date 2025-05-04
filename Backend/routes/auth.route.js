import express from 'express';
import { registerUser, loginUser, registerAdmin, loginAdmin } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/registerAdmin', registerAdmin);
router.post('/loginAdmin', loginAdmin);

export default router;
