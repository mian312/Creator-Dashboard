import redisClient from '../config/redis.js'; // Import the client instance

const setToken = async (key, value, expiryInSeconds) => {
  try {
    await redisClient.set(`${key}`, value);
    await redisClient.expire(`${key}`, expiryInSeconds);
  } catch (err) {
    console.error('Error setting token in Redis:', err);
    throw err;
  }
};

const getToken = async (key) => {
  try {
    return await redisClient.get(`${key}`);
  } catch (err) {
    console.error('Error getting token from Redis:', err);
    throw err;
  }
};

const deleteToken = async (key) => {
    try {
        await redisClient.del(`${key}`);
    } catch (err) {
        console.error('Error deleting token from Redis:', err);
        throw err;
    }
};

export default {
  setToken,
  getToken,
  deleteToken,
};
