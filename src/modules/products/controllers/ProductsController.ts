import { Request, Response } from 'express';

import ListProductService from '../services/ListProductService';
import GetProductService from '../services/GetProductService';
import CreateProductService from '../services/CreateProductService';
import UpdateProductService from '../services/UpdateProductService';
import DeleteProductService from '../services/DeleteProductService';

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

        await getProduct.execute({ id });

        const res = await new GetProductService().execute({ id });
        return response.json(res);
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

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, price, quantity } = request.body;
        const { id } = request.params;

        const updateProduct = new UpdateProductService();

        await updateProduct.execute({
            id,
            name,
            price,
            quantity,
        });

        const res = await new GetProductService().execute({ id });
        return response.json(res);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const deleteProduct = new DeleteProductService();

        await deleteProduct.execute({ id });

        return response.json({
            message: 'Successfully deleted',
        });
    }
}
