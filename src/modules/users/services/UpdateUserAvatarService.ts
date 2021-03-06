import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import UserRepository from '../typeorm/repositories/UsersRepository';
import path from 'path';
import upload from '@config/upload';
import fs from 'fs';
import User from '../typeorm/entities/User';

interface IRequest {
    user_id: string;
    avatarFilename: string | undefined;
}

export default class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UserRepository);

        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found.');
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(upload.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        if (avatarFilename === undefined) {
            throw new AppError('No media selected.');
        }

        user.avatar = avatarFilename;

        await usersRepository.save(user);

        return user;
    }
}
