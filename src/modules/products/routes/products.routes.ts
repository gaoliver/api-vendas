import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

// Create Product
productsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().precision(2).required(),
            quantity: Joi.number().required(),
        },
    }),
    productsController.create,
);

// Get Product by ID
productsRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    productsController.get,
);

// Edit Product
productsRouter.patch(
    '/:id',
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
    productsController.update,
);

// Delete Produto
productsRouter.delete(
    '/product/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    productsController.delete,
);

// Listar todos os produtos
productsRouter.get('/', productsController.index);

export default productsRouter;
