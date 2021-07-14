import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
    return response.json({ message: 'Projeto API Vendas rodando!😎' });
});

export default routes;
