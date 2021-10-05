import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';

import UsersController from '../controllers/UsersController';
import IsAuthenticated from '../../../shared/http/middlewares/IsAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';
import uploadConfig from '@config/upload';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

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
    '/user',
    IsAuthenticated,
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
        },
    }),
    usersController.get,
);

// Edit User
usersRouter.patch(
    '/user/:id',
    IsAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    usersController.update,
);

usersRouter.patch(
    '/avatar',
    IsAuthenticated,
    upload.single('avatar'),
    userAvatarController.update,
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
