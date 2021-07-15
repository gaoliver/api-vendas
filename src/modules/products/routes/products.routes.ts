import { Router } from 'express';

import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.post('/product', productsController.create);
productsRouter.get('/product/:id', productsController.get);
productsRouter.patch('/product/:id', productsController.update);
productsRouter.delete('/product/:id', productsController.delete);

productsRouter.get('/products', productsController.index);

export default productsRouter;
