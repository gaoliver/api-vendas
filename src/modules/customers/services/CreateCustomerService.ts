import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import CustomerRepository from '../typeorm/repositories/CustomersRepository';
import Customer from '../typeorm/entities/Customer';

interface IRequest {
    name: string;
    email: string;
}

export default class CreateCustomerService {
    public async execute({ name, email }: IRequest): Promise<Customer> {
        const customersRepository = getCustomRepository(CustomerRepository);
        const emailExists = await customersRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError('This email is already in use.');
        }

        const customer = customersRepository.create({
            name,
            email,
        });

        await customersRepository.save(customer);

        return customer;
    }
}
