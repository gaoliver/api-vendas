import { Router } from 'express';

import productsRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/users.routes';
import sessionRouter from '@modules/users/routes/sessions.routes';
import passwordRouter from '@modules/users/routes/password.routes';

const routes = Router();

routes.get('/', (request, response) => {
    return response.json({ message: 'Projeto API Vendas rodando!😎' });
});

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/login', sessionRouter);
routes.use('/password', passwordRouter);

export default routes;
