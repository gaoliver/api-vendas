import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUsersService';
import DeleteUserService from '../services/DeleteUserService';
import GetUserService from '../services/GetUserService';
import ListUsersService from '../services/ListUsersService';
import UpdateUserService from '../services/UpdateUserService';

export default class UsersController {
    // Default create user
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        return response.json(user);
    }

    // List users
    public async list(request: Request, response: Response): Promise<Response> {
        const listUsers = new ListUsersService();

        const users = await listUsers.execute();

        return response.json(users);
    }

    // Get user
    public async get(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        const getUser = new GetUserService();

        const user = await getUser.execute({ email });

        return response.json(user);
    }

    // Edit user
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password } = request.body;

        const updateUser = new UpdateUserService();

        const user = updateUser.execute({
            name,
            email,
            password,
        });

        return response.json(user);
    }

    // Delete user
    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const deleteUser = new DeleteUserService();

        await deleteUser.execute({ id });

        return response.json({
            message: 'User Successfully deleted.',
        });
    }
}
