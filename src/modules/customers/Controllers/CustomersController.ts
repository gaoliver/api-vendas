import { Request, Response } from 'express';

import ListCustomerService from '../services/ListCustomersService';
import GetCustomerService from '../services/GetCustomerProfileService';
import CreateCustomerService from '../services/CreateCustomerService';
import UpdateCustomerService from '../services/UpdateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';

export default class CustomersController {
    // Default list customers
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listCustomers = new ListCustomerService();

        const customers = await listCustomers.execute();

        return response.json(customers);
    }

    public async get(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const getCustomer = new GetCustomerService();

        await getCustomer.execute({ id });

        const res = await new GetCustomerService().execute({ id });
        return response.json(res);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email } = request.body;

        const createCustomer = new CreateCustomerService();

        const customer = await createCustomer.execute({
            name,
            email,
        });

        return response.json(customer);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email } = request.body;
        const { id } = request.params;

        const updateCustomer = new UpdateCustomerService();

        await updateCustomer.execute({
            id,
            name,
            email,
        });

        const res = await new GetCustomerService().execute({ id });
        return response.json(res);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const deleteCustomer = new DeleteCustomerService();

        await deleteCustomer.execute({ id });

        return response.json({
            message: 'Successfully deleted',
        });
    }
}
