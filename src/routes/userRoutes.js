import express from 'express';
import UserController from '../controllers/UserController';
import UserMiddlewares from '../middlewares/userMiddlewares';
import userValidation from '../validation/userValidation';
import validationHandler from '../validation/validationHandler';

const userRoutes = express.Router();

const {
  createUser,
  getGoogleUrl,
  getGoogleAccountFromCode,
  getLinkedinUrl,
  getLinkedinAccountFromCode,
  updateUserInfo
} = UserController;

const { checkUserExists, confirmUserExists } = UserMiddlewares;

userRoutes.post('/signup', userValidation, validationHandler, checkUserExists, createUser);

userRoutes.get('/user/google/signin', getGoogleUrl);
userRoutes.get('/google/callback', getGoogleAccountFromCode);
userRoutes.get('/user/linkedin/signin', getLinkedinUrl);
userRoutes.get('/linkedin/callback', getLinkedinAccountFromCode);
userRoutes.patch('/user/update-user', userValidation, validationHandler, confirmUserExists, updateUserInfo);


export default userRoutes;
