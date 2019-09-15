import express from 'express';
import Auth from '../middlewares/auth';
import CommentController from '../controllers/commentController';
import commentValidation from '../validation/commentValidation';
import validationHandler from '../validation/validationHandler';


const { verifyToken } = Auth;
const { postComment } = CommentController;


const commentRoutes = express.Router();

commentRoutes.post('/:tripId/comment', verifyToken, commentValidation, validationHandler, postComment);


export default commentRoutes;
