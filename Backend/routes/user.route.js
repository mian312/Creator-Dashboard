import express from 'express';
import { 
  savePost, 
  reportPost, 
  dailyLoginReward, 
  sharePostReward,
  savePostReward,
  completeProfileReward,
  getUserProfile,
  getSavedPosts
} from '../controllers/user.controller.js';
import authenticate from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/savePost', authenticate, savePost);
router.post('/reportPost', authenticate, reportPost);
router.post('/dailyLoginReward', authenticate, dailyLoginReward);
router.post('/sharePostReward', authenticate, sharePostReward);
router.post('/savePostReward', authenticate, savePostReward);
router.post('/completeProfileReward', authenticate, completeProfileReward);
router.get('/profile', authenticate, getUserProfile);
router.get('/savedPosts', authenticate, getSavedPosts);

export default router;
