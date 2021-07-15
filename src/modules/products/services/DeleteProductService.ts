import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

export default class DeleteProductService {
    public async execute({ id }: Product): Promise<void> {
        const productsRepository = getCustomRepository(ProductRepository);

        const product = await productsRepository.findOne(id);

        if (!product) {
            throw new AppError('Product not found');
        }

        // await productsRepository.delete(id);
        await productsRepository.remove(product);
    }
}
