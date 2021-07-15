import { Router } from 'express';

import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.post('/', productsController.create);
productsRouter.get('/:id', productsController.get);
productsRouter.patch('/:id', productsController.update);
productsRouter.delete('/:id', productsController.delete);

productsRouter.get('s', productsController.index);

export default productsRouter;
