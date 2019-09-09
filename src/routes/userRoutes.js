import express from 'express';
import UserController from '../controllers/UserController';
import UserMiddlewares from '../middlewares/userMiddlewares';
import { userSignupValidation, userLoginValidation } from '../validation/userValidation';
import validationHandler from '../validation/validationHandler';

const userRoutes = express.Router();

const { createUser, getUser } = UserController;
const { checkUserExists } = UserMiddlewares;

userRoutes.post('/signup', userSignupValidation, validationHandler, checkUserExists, createUser);
userRoutes.post('/signin', userLoginValidation, validationHandler, getUser);

export default userRoutes;
