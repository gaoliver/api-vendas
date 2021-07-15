import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
    name: string;
    price: number;
    quantity: number;
}

export default class CreateProductService {
    public async execute({
        name,
        price,
        quantity,
    }: IRequest): Promise<IRequest> {
        const productsRepository = getCustomRepository(ProductRepository);
        const productExists = await productsRepository.findByName(name);

        if (productExists) {
            throw new AppError('There is already a product with this name');
        }

        const product = productsRepository.create({
            name,
            price,
            quantity,
        });

        await productsRepository.save(product);

        return product;
    }
}
