import express from 'express';
import Auth from '../middlewares/auth';
import RequestController from '../controllers/RequestController';

const { verifyToken } = Auth;
const { getUserRequests } = RequestController;

const requestRoutes = express.Router();

requestRoutes.get('/user/requests', verifyToken, getUserRequests);

export default requestRoutes;
