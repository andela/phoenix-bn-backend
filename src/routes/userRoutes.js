import express from 'express';
import UserController from '../controllers/UserController';
import UserMiddlewares from '../middlewares/userMiddlewares';
import userValidations from '../validation/userValidation';
import validationHandler from '../validation/validationHandler';

const userRoutes = express.Router();

const {
  createUser,
  login,
  getGoogleUrl,
  getGoogleAccountFromCode,
  getLinkedinUrl,
  getLinkedinAccountFromCode,
  updateUserInfo
} = UserController;


const { emailValidation, userValidation, userLoginValidation } = userValidations;

const { checkUserExists, confirmUserExist, checkUserExistBeforeLogin } = UserMiddlewares;

userRoutes.post('/signup', emailValidation, validationHandler, checkUserExists, createUser);
userRoutes.post('/signin', userLoginValidation, validationHandler, checkUserExistBeforeLogin, login);

userRoutes.get('/user/google/signin', getGoogleUrl);
userRoutes.get('/google/callback', getGoogleAccountFromCode);
userRoutes.get('/user/linkedin/signin', getLinkedinUrl);
userRoutes.get('/linkedin/callback', getLinkedinAccountFromCode);
userRoutes.patch('/user/update-profile', userValidation, validationHandler, confirmUserExist, updateUserInfo);


export default userRoutes;
