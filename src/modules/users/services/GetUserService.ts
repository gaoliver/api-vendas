import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
    email: string;
}
export default class GetUserService {
    public async execute({ email }: IRequest): Promise<IRequest | undefined> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User not found');
        }

        return user;
    }
}
