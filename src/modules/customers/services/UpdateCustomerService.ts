import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';
import Customer from '../typeorm/entities/Customer';

interface IRequest {
    id: string;
    name: string;
    email: string;
}

export default class UpdateCustomerService {
    public async execute({ id, name, email }: IRequest): Promise<Customer> {
        const customersRepository = getCustomRepository(CustomersRepository);

        const customer = await customersRepository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found.');
        }

        const emailExists = await customersRepository.findByEmail(email);

        if (emailExists && emailExists.id !== customer.id) {
            throw new AppError(
                'There is already a customer with this email address.',
            );
        }

        if (name.length > 0) {
            customer.name = name;
        }
        if (email.length > 0) {
            customer.email = email;
        }

        await customersRepository.save(customer);

        return customer;
    }
}
