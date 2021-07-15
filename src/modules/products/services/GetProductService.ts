import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

export default class GetProductService {
    public async execute({ id }: Product): Promise<Product | undefined> {
        const productsRepository = getCustomRepository(ProductRepository);

        const product = productsRepository.findOne(id);

        if (!product) {
            throw new AppError('Product not found');
        }

        return product;
    }
}
