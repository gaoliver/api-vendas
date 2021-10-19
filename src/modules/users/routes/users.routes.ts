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

usersRouter.patch('/user', IsAuthenticated, usersController.update);

usersRouter.patch(
    '/avatar',
    IsAuthenticated,
    upload.single('avatar'),
    userAvatarController.update,
);

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

usersRouter.get('/', IsAuthenticated, usersController.list);

export default usersRouter;
