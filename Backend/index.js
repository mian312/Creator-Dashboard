import express from 'express';
import authRoute from './routes/auth.route.js';
import userRoute from './routes/user.route.js';
import adminRoute from './routes/admin.route.js';
import postsRoute from './routes/posts.route.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/admin', adminRoute);
app.use('/posts', postsRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
