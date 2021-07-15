import { Router } from 'express';

import productsRouter from '@modules/products/routes/products.routes';

const routes = Router();

routes.get('/', (request, response) => {
    return response.json({ message: 'Projeto API Vendas rodando!😎' });
});

routes.use('/product', productsRouter);

export default routes;
