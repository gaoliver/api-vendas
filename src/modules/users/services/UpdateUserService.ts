import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
    id: string;
    name: string;
    email: string;
}

export default class UpdateUserService {
    public async execute({ id, name, email }: IRequest): Promise<IRequest> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findById(id);

        if (!user) {
            throw new AppError('User not found.');
        }

        const emailExists = await usersRepository.findByEmail(email);

        if (emailExists && emailExists.id !== user.id) {
            throw new AppError(
                'There is already a user with this email address.',
            );
        }

        if (name.length > 0) {
            user.name = name;
        }
        if (email.length > 0) {
            user.email = email;
        }

        await usersRepository.save(user);

        return user;
    }
}
