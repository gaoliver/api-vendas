import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import UsersController from '../controllers/UsersController';
import IsAuthenticated from '../middlewares/IsAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

// Create User
usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    usersController.index,
);

// Get User by ID
usersRouter.get(
    '/:id',
    IsAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    usersController.get,
);

// Edit User
usersRouter.patch(
    '/:id',
    IsAuthenticated,
    celebrate({
        [Segments.BODY]: {
            name: Joi.string(),
            price: Joi.number().precision(2),
            quantity: Joi.number(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    usersController.update,
);

// Delete Produto
usersRouter.delete(
    '/:id',
    IsAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    usersController.delete,
);

// Listar todos os produtos
usersRouter.get('/', IsAuthenticated, usersController.list);

export default usersRouter;
