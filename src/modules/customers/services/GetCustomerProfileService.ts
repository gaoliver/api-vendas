import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
    id: string;
}

export default class GetCustomerProfileService {
    public async execute({ id }: IRequest): Promise<Customer> {
        const customersRepository = getCustomRepository(CustomersRepository);

        const customerProfile = await customersRepository.findById(id);

        if (!customerProfile) {
            throw new AppError('Customer not found.');
        }

        return customerProfile;
    }
}
