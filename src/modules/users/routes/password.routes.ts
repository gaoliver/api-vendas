import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ForgotPsswdController from '../controllers/ForgotPsswdController';
import ResetPsswdController from '../controllers/ResetPsswdController';

const passwordRouter = Router();
const forgotPsswdController = new ForgotPsswdController();
const resetPsswdController = new ResetPsswdController();

// Forgot Password
passwordRouter.post(
    '/forgot',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
        },
    }),

    forgotPsswdController.create,
);

// Reset Password
passwordRouter.post(
    '/reset',
    celebrate({
        [Segments.BODY]: {
            token: Joi.string().uuid().required(),
            password: Joi.string().required(),
            passwordConfirmation: Joi.string()
                .required()
                .valid(Joi.ref('password')),
        },
    }),

    resetPsswdController.create,
);

export default passwordRouter;
