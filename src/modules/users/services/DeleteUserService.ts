import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IResponse {
    id: string;
}

export default class DeleteUserService {
    public async execute({ id }: IResponse): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne(id);

        if (!user) {
            throw new AppError('User not found');
        }

        // await usersRepository.delete(id);
        await usersRepository.remove(user);
    }
}
