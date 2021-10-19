import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import { compare, hash } from 'bcrypt';

interface IRequest {
    id: string;
    name: string;
    email: string;
    password: string;
    old_password: string;
}

export default class UpdateUserService {
    public async execute({
        id,
        name,
        email,
        password,
        old_password,
    }: IRequest): Promise<User> {
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

        if (password && !old_password) {
            throw new AppError('Old password is required.');
        }

        if (password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);

            if (!checkOldPassword) {
                throw new AppError('Old password does not match.');
            }

            user.password = await hash(password, 8);
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
