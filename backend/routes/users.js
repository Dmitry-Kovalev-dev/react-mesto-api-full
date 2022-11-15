const userRouter = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  getMyData,
  signout,
} = require('../controllers/users');

const {
  validateUpdateUser,
  validateUpdateAvatar,
  validateParamId,
} = require('../utils/validateJoi');

userRouter.get('/users', getUsers);
userRouter.get('/users/me', getMyData);
userRouter.get('/users/:id', validateParamId, getUserById);
userRouter.patch('/users/me', validateUpdateUser, updateUser);
userRouter.patch('/users/me/avatar', validateUpdateAvatar, updateUserAvatar);
userRouter.get('/signout', signout);

module.exports = userRouter;
