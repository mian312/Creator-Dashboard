import express from 'express';
import { getAllReports, updateUserCoins, getAllUsers } from '../controllers/admin.controller.js';
import authenticate from '../middlewares/auth.middleware.js';
import authorizeAdmin from '../middlewares/role.middleware.js';

const router = express.Router();

router.get('/reports', authenticate, authorizeAdmin, getAllReports);
router.put('/updateCoins', authenticate, authorizeAdmin, updateUserCoins);
router.get('/users', authenticate, authorizeAdmin, getAllUsers);

export default router;
