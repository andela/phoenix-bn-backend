import express from 'express';
import TripController from '../controllers/TripController';
import Auth from '../middlewares/auth';
import tripValidation from '../validation/tripValidation';
import validationHandler from '../validation/validationHandler';

const { verifyToken } = Auth;
const { oneWayTrip } = TripController;
const { dateFormat, tripInputValidation } = tripValidation;

const tripRoutes = express.Router();

tripRoutes.post('/trip', verifyToken, dateFormat, tripInputValidation, validationHandler, oneWayTrip);

export default tripRoutes;

