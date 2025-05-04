import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  post: {
    postId: { type: String, required: true },
    postUrl: { type: String, required: true },
  },
  timestamp: { type: Date, default: Date.now },
});

const Report = mongoose.model('Report', reportSchema);

export default Report;
