const router = require('express').Router();
const {
  validateId,
  validateUserUpdate,
  validateAvatar,
} = require('../middlewares/celebrate');
const {
  getUsers,
  getUserId,
  updateAvatar,
  updateProfile,
  getCurrentUserInfo,
} = require('../controllers/users');

router.get('/users/me', getCurrentUserInfo);
router.get('/users', getUsers);
router.get('/users/:_id', validateId, getUserId);
router.patch('/users/me/avatar', validateAvatar, updateAvatar);
router.patch('/users/me', validateUserUpdate, updateProfile);

module.exports = router;
