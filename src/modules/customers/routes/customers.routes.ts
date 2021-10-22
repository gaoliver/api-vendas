import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import CustomersController from '../controllers/CustomersController';
import IsAuthenticated from '@shared/http/middlewares/IsAuthenticated';

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.post(
    '/',
    IsAuthenticated,
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
        },
    }),
    customersController.create,
);

customersRouter.get(
    '/:id',
    IsAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    customersController.get,
);

customersRouter.patch(
    '/:id',
    IsAuthenticated,
    celebrate({
        [Segments.BODY]: {
            name: Joi.string(),
            email: Joi.string().email(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    customersController.update,
);

customersRouter.delete(
    '/customer/:id',
    IsAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    customersController.delete,
);

customersRouter.get('/', IsAuthenticated, customersController.index);

export default customersRouter;
