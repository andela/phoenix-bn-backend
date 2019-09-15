import { check } from 'express-validator';

const commentInputValidation = [
  check('comment').trim().not().isEmpty()
    .withMessage('comment cannot be empty')
];


export default commentInputValidation;
