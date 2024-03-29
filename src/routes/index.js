import express from 'express';
import userRoutes from './userRoutes';
import tripRoutes from './tripRoutes';
import commentRoutes from './commentRoutes';


const Router = express.Router();
Router.get('/', (req, res) => res.status(301).redirect('api/v1'));
Router.get('/v1', (req, res) => res.status(200).json({
  status: 'success',
  message: 'Welcome to WeTravel API version 1',
}));

// Routes
Router.use('/v1/auth', userRoutes);
Router.use('/v1', tripRoutes);
Router.use('/v1', commentRoutes);


export default Router;
