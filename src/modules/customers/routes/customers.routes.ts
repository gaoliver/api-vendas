import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import CustomersController from '../controllers/CustomersController';

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.post(
    '/',
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
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    customersController.get,
);

customersRouter.patch(
    '/:id',
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
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    customersController.delete,
);

customersRouter.get('/', customersController.index);

export default customersRouter;
