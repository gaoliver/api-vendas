import { getCustomRepository } from 'typeorm';
import { compare } from 'bcrypt';

import AppError from '@shared/errors/AppError';
import UserRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';

interface IRequest {
    email: string;
    password: string;
}

export default class CreateSessionsService {
    public async execute({ email, password }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UserRepository);
        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordConfirmed = await compare(password, user.password);

        if (!passwordConfirmed) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        return user;
    }
}
