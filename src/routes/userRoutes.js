import express from 'express';
import UserController from '../controllers/UserController';
import UserMiddlewares from '../middlewares/userMiddlewares';

const userRoutes = express.Router();

const { createUser, getUser } = UserController;
const { checkUserExists } = UserMiddlewares;

userRoutes.post('/signup', checkUserExists, createUser);
userRoutes.post('/signin', getUser);

export default userRoutes;
