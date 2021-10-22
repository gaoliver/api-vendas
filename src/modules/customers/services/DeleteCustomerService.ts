import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IResponse {
    id: string;
}

export default class DeleteCustomerService {
    public async execute({ id }: IResponse): Promise<void> {
        const customersRepository = getCustomRepository(CustomersRepository);

        const customer = await customersRepository.findOne(id);

        if (!customer) {
            throw new AppError('Customer not found');
        }

        // await customersRepository.delete(id);
        await customersRepository.remove(customer);
    }
}
