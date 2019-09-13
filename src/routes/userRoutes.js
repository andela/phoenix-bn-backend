import express from 'express';
import UserController from '../controllers/UserController';
import UserMiddlewares from '../middlewares/UserMiddlewares';
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
} = UserController;

const { checkUserExists, checkUserExistBeforeLogin, checkUserIsSuperAdmin } = UserMiddlewares;
const { emailValidation, userLoginValidation, sentUserRoleValidation } = userValidations;

userRoutes.post('/signup',
  emailValidation,
  validationHandler, checkUserIsSuperAdmin, sentUserRoleValidation, checkUserExists, createUser);
userRoutes.post('/signin', userLoginValidation, validationHandler, checkUserExistBeforeLogin, login);
userRoutes.get('/user/google/signin', getGoogleUrl);
userRoutes.get('/google/callback', getGoogleAccountFromCode);
userRoutes.get('/user/linkedin/signin', getLinkedinUrl);
userRoutes.get('/linkedin/callback', getLinkedinAccountFromCode);

export default userRoutes;
