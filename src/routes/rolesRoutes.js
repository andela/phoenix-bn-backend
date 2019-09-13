import express from 'express';
import UserMiddlewares from '../middlewares/userMiddlewares';
import RolesMiddlewares from '../middlewares/RolesMiddlewares';
import userValidations from '../validation/userValidation';
import validationHandler from '../validation/validationHandler';
import rolesController from '../controllers/RolesController';

const roleRoutes = express.Router();

const { checkUserIsSuperAdmin, checkUserExistBeforeAddRole } = UserMiddlewares;
const { checkRoleExistForUser } = RolesMiddlewares;
const { emailValidation, sentUserRoleValidation } = userValidations;
const { createRole } = rolesController;

roleRoutes.post('/role',
  checkUserIsSuperAdmin,
  emailValidation,
  validationHandler,
  checkUserExistBeforeAddRole, sentUserRoleValidation, checkRoleExistForUser, createRole);

export default roleRoutes;
