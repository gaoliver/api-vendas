import { Request, Response } from 'express';

import ListProductService from '../services/ListProductService';
import GetProductService from '../services/GetProductService';

export default class ProductsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listProducts = new ListProductService();

        const products = listProducts.execute();

        return response.json(products);
    }

    public async get(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const getProduct = new GetProductService();

        const product = getProduct.execute({ id });

        return response.json(product);
    }
}
