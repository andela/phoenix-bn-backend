import express from 'express';
import UserController from '../controllers/UserController';
import UserMiddlewares from '../middlewares/userMiddlewares';
import userValidations from '../validation/userValidation';
import rolesValidation from '../validation/rolesValidation';
import validationHandler from '../validation/validationHandler';
import Auth from '../middlewares/auth';

const userRoutes = express.Router();

const {
  createUser,
  login,
  getGoogleUrl,
  getGoogleAccountFromCode,
  getLinkedinUrl,
  getLinkedinAccountFromCode,
  rememberInfo,
} = UserController;

const { checkUserExists, checkUserExistBeforeLogin, checkUserIsSuperAdmin } = UserMiddlewares;
const {
  emailValidation,
  userLoginValidation, rememberInfoValidation,
} = userValidations;
const { sentUserRoleValidation } = rolesValidation;

const { verifyToken } = Auth;

userRoutes.post('/signup',
  checkUserIsSuperAdmin,
  emailValidation,
  validationHandler, sentUserRoleValidation, checkUserExists, createUser);
userRoutes.post('/signin', userLoginValidation, validationHandler, checkUserExistBeforeLogin, login);
userRoutes.patch('/remember-info', verifyToken, rememberInfoValidation, validationHandler, rememberInfo);

userRoutes.get('/user/google/signin', getGoogleUrl);
userRoutes.get('/google/callback', getGoogleAccountFromCode);
userRoutes.get('/user/linkedin/signin', getLinkedinUrl);
userRoutes.get('/linkedin/callback', getLinkedinAccountFromCode);

export default userRoutes;
