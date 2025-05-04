import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  coins: { type: Number, default: 0 },
  email: { type: String, unique: true },
  mobile: { type: String, unique: true },
  savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  reportedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report' }],
  lastRewardDate: { type: Date },
  profileRewardClaimed: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

export default User;
