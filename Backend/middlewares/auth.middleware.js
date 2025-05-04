import jwt from 'jsonwebtoken';
import redisService from '../services/redis.service.js';

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecret');
    const storedToken = await redisService.getToken(decoded.userId);

    if (!storedToken || storedToken !== token) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default authenticate;
