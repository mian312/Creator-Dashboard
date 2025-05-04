import User from '../models/users.model.js';
import Report from '../models/reports.model.js';

const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().populate('reporter', 'username');
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports', error: error.message });
  }
};

const updateUserCoins = async (req, res) => {
  try {
    const { userId, coins } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.coins = coins;
    await user.save();

    res.status(200).json({ message: 'User coins updated successfully', coins: user.coins });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user coins', error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

export { getAllReports, updateUserCoins, getAllUsers };
