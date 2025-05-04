import User from '../models/users.model.js';
import Post from '../models/posts.model.js';
import Report from '../models/reports.model.js';
import { giveDailyLoginReward, giveSavePostReward, giveSharePostReward, giveCompleteProfileReward } from '../utils/coinUtils.js';

const savePost = async (req, res) => {
  try {
    const { postId, postUrl, source, title, author, thumbnail, content } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if post exists, if not create it
    let post = await Post.findOne({ postId });
    if (!post) {
      post = new Post({ postId, postUrl, source, title, author, thumbnail, content });
      await post.save();
    }

    if (user.savedPosts.includes(post._id)) {
      return res.status(400).json({ message: 'Post already saved' });
    }

    user.savedPosts.push(post._id);
    await user.save();

    res.status(200).json({ 
      message: 'Post saved successfully',
      post: {
        postId: post.postId,
        postUrl: post.postUrl,
        source: post.source,
        title: post.title,
        author: post.author,
        thumbnail: post.thumbnail,
        content: post.content,
        savedAt: post.savedAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error saving post', error: error.message });
  }
};

const reportPost = async (req, res) => {
  try {
    const { postId, postUrl } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const report = new Report({
      reporter: userId,
      post: {
        postId: postId,
        postUrl: postUrl,
      },
    });
    await report.save();

    user.reportedPosts.push(report._id);
    await user.save();

    res.status(201).json({ message: 'Post reported successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error reporting post', error: error.message });
  }
};

const dailyLoginReward = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user has already claimed daily reward today
    const lastRewardDate = user.lastRewardDate || new Date(0);
    const today = new Date();
    
    // If last reward was claimed today, prevent claiming again
    if (lastRewardDate.toDateString() === today.toDateString()) {
      return res.status(400).json({ 
        message: 'Daily reward already claimed today',
        coins: user.coins
      });
    }
    
    // Give reward and update last reward date
    const updatedCoins = await giveDailyLoginReward(user);
    user.lastRewardDate = today;
    await user.save();

    res.status(200).json({ message: 'Daily login reward claimed', coins: updatedCoins });
  } catch (error) {
    res.status(500).json({ message: 'Error claiming daily login reward', error: error.message });
  }
};

const sharePostReward = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedCoins = await giveSharePostReward(user);
    res.status(200).json({ message: 'Share post reward claimed', coins: updatedCoins });
  } catch (error) {
    res.status(500).json({ message: 'Error claiming share post reward', error: error.message });
  }
};

const savePostReward = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedCoins = await giveSavePostReward(user);
    res.status(200).json({ message: 'Share post reward claimed', coins: updatedCoins });
  } catch (error) {
    res.status(500).json({ message: 'Error claiming share post reward', error: error.message });
  }
};

const completeProfileReward = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { email, mobile } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if reward already claimed
    if (user.profileRewardClaimed) {
      return res.status(400).json({
        message: 'Profile completion reward already claimed',
        coins: user.coins
      });
    }

    // Update user profile
    user.email = email;
    user.mobile = mobile;
    user.profileRewardClaimed = true;
    await user.save();

    // Give reward for completing profile
    const updatedCoins = await giveCompleteProfileReward(user);

    res.status(200).json({
      message: 'Profile completed and reward claimed',
      coins: updatedCoins
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error completing profile',
      error: error.message
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }
};

const getSavedPosts = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const user = await User.findById(userId)
      .populate({
        path: 'savedPosts',
        select: 'postId postUrl source title author thumbnail content savedAt'
      });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user.savedPosts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching saved posts', error: error.message });
  }
};

export { 
  savePost, 
  reportPost, 
  dailyLoginReward, 
  sharePostReward, 
  savePostReward, 
  completeProfileReward,
  getUserProfile,
  getSavedPosts 
};
