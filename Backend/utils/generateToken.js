import jwt from 'jsonwebtoken';

const generateToken = (userId, isAdmin = false) => {
  const payload = {
    userId,
    isAdmin,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET || 'defaultSecret', {
    expiresIn: '1d',
  });

  return token;
};

export default generateToken;
