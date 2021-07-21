import { Router } from 'express';

import productsRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/users.routes';

const routes = Router();

routes.get('/', (request, response) => {
    return response.json({ message: 'Projeto API Vendas rodando!😎' });
});

routes.use('/', productsRouter);
routes.use('/', usersRouter);

export default routes;
