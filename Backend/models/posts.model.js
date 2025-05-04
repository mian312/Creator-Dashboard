import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  postId: { type: String, required: true }, // ID from Reddit or Twitter
  postUrl: { type: String, required: true },
  source: { type: String, enum: ['reddit', 'twitter'], required: true },

  // Optional metadata for faster rendering
  title: { type: String },
  author: { type: String },
  thumbnail: { type: String },
  content: { type: String },

  savedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);

export default Post;
