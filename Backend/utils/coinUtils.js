const COMPLETE_PROFILE_REWARD = 100;
const DAILY_LOGIN_REWARD = 10;
const SHARE_POST_REWARD = 5;
const SAVE_POST_REWARD = 5;

const giveCompleteProfileReward = async (user) => {
  user.coins += COMPLETE_PROFILE_REWARD;
  await user.save();
  return user.coins;
};

const giveDailyLoginReward = async (user) => {
  user.coins += DAILY_LOGIN_REWARD;
  await user.save();
  return user.coins;
};

const giveSharePostReward = async (user) => {
  user.coins += SHARE_POST_REWARD;
  await user.save();
  return user.coins;
};

const giveSavePostReward = async (user) => {
  user.coins += SAVE_POST_REWARD;
  await user.save();
  return user.coins;
};

export {
  giveCompleteProfileReward,
  giveDailyLoginReward,
  giveSharePostReward,
  giveSavePostReward
};
