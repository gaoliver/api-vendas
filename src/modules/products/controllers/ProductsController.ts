import { Request, Response } from 'express';

import ListProductService from '../services/ListProductService';
import GetProductService from '../services/GetProductService';
import CreateProductService from '../services/CreateProductService';

export default class ProductsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listProducts = new ListProductService();

        const products = await listProducts.execute();

        return response.json(products);
    }

    public async get(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const getProduct = new GetProductService();

        const product = await getProduct.execute({ id });

        return response.json(product);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, price, quantity } = request.body;

        const createProduct = new CreateProductService();

        const product = await createProduct.execute({
            name,
            price,
            quantity,
        });

        return response.json(product);
    }
}
