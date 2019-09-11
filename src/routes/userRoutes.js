import express from 'express';
import UserController from '../controllers/UserController';
import UserMiddlewares from '../middlewares/userMiddlewares';
import userValidations from '../validation/userValidation';
import validationHandler from '../validation/validationHandler';
import Auth from '../middlewares/auth';

const userRoutes = express.Router();

const {
  createUser,
  forgetPassword,
  resetPassword,
  login,
  getGoogleUrl,
  getGoogleAccountFromCode,
  getLinkedinUrl,
  getLinkedinAccountFromCode,
  rememberInfo,
} = UserController;

const { checkUserExists, checkUserExistBeforeLogin } = UserMiddlewares;
const {
  emailValidation,
  userLoginValidation,
  rememberInfoValidation,
  checkPassword
} = userValidations;
const { verifyToken, validateToken } = Auth;

userRoutes.post('/signup', verifyToken, emailValidation, validationHandler, checkUserExists, createUser);
userRoutes.post('/signin', userLoginValidation, validationHandler, checkUserExistBeforeLogin, login);
userRoutes.patch('/remember-info', verifyToken, rememberInfoValidation, validationHandler, rememberInfo);

userRoutes.post('/forgetpassword', emailValidation, validationHandler, checkUserExistBeforeLogin, forgetPassword);
userRoutes.patch('/resetpassword/:token', validateToken, checkPassword, validationHandler, resetPassword);

userRoutes.get('/user/google/signin', getGoogleUrl);
userRoutes.get('/google/callback', getGoogleAccountFromCode);
userRoutes.get('/user/linkedin/signin', getLinkedinUrl);
userRoutes.get('/linkedin/callback', getLinkedinAccountFromCode);

export default userRoutes;
