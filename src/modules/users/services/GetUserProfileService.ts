import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
    id: string;
}

export default class GetUserProfileRepository {
    public async execute({ id }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const userProfile = await usersRepository.findById(id);

        if (!userProfile) {
            throw new AppError('User not found.');
        }

        return userProfile;
    }
}
