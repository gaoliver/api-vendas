import { getCustomRepository } from 'typeorm';

import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

export default class ListCustomersService {
    public async execute(): Promise<Customer[]> {
        const customersRepository = getCustomRepository(CustomersRepository);

        const customers = customersRepository.find();

        return customers;
    }
}
