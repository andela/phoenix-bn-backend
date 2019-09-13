import express from 'express';
import TripController from '../controllers/TripController';
import Auth from '../middlewares/auth';
import TripMiddlewares from '../middlewares/tripMiddlewares';
import tripValidation from '../validation/tripValidation';
import validationHandler from '../validation/validationHandler';

const { verifyToken } = Auth;
const { oneWayTrip, rejectTripRequest } = TripController;
const { dateFormat, tripInputValidation } = tripValidation;
const { checkTripExists } = TripMiddlewares;

const tripRoutes = express.Router();

tripRoutes.post('/trip', verifyToken, dateFormat, tripInputValidation, validationHandler, oneWayTrip);
tripRoutes.patch('/trip/:id/reject', verifyToken, checkTripExists, rejectTripRequest);

export default tripRoutes;

