import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

export default class UpdateProductService {
    public async execute({
        id,
        name,
        price,
        quantity,
    }: Product): Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepository);

        const product = await productsRepository.findOne(id);

        if (!product) {
            throw new AppError('Product not found');
        }

        const productExists = await productsRepository.findByName(name);

        if (productExists) {
            throw new AppError('There is already a product with this name');
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await productsRepository.save(product);

        return product;
    }
}
