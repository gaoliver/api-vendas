import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IResponse {
    email: string;
}

export default class DeleteUserService {
    public async execute({ email }: IResponse): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User not found');
        }

        // await usersRepository.delete(id);
        await usersRepository.remove(user);
    }
}
