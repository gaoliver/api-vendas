import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ForgotPsswdController from '../controllers/ForgotPsswdController';

const passwordRouter = Router();
const forgotPsswdController = new ForgotPsswdController();

// Create User
passwordRouter.post(
    '/forgot',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
        },
    }),

    forgotPsswdController.create,
);

export default passwordRouter;
