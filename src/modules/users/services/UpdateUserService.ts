import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

export default class UpdateUserService {
    public async execute({
        name,
        email,
        password,
    }: IRequest): Promise<IRequest> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User not found');
        }

        const userExists = await usersRepository.findByEmail(email);

        if (userExists) {
            throw new AppError(
                'There is already a user with this email address.',
            );
        }

        user.name = name;
        user.email = email;
        user.password = password;

        await usersRepository.save(user);

        return user;
    }
}
