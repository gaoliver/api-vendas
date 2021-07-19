import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import UserRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
    id: string;
    name: string;
    email: string;
    password: string;
}

export default class CreateUserService {
    public async execute({
        name,
        id,
        email,
        password,
    }: IRequest): Promise<IRequest> {
        const usersRepository = getCustomRepository(UserRepository);
        const emailExists = await usersRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError('This email is already in use.');
        }

        const user = usersRepository.create({
            id,
            name,
            email,
            password,
        });

        await usersRepository.save(user);

        return user;
    }
}
