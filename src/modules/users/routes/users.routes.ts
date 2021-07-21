import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

// Create User
usersRouter.post(
    '/user',
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
    '/user/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    usersController.get,
);

// Edit User
usersRouter.patch(
    '/user/:id',
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
    '/user/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    usersController.delete,
);

// Listar todos os produtos
usersRouter.get('/users', usersController.list);

export default usersRouter;
