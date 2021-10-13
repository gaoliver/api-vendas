import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import EtherealMail from '@config/mail/EtherealMail';

interface IRequest {
    email: string;
}

export default class SendForgorPsswdEmailService {
    public async execute({ email }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);

        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User does not exist.');
        }

        const token = await userTokensRepository.generate(user.id);

        await EtherealMail.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[API Vendas] Recuperação de senha',
            templateData: {
                template: `Olá {{name}}. Aqui está o seu token para recuperação de senha: {{token}}`,
                variables: {
                    name: user.name,
                    token: token?.token,
                },
            },
        });
    }
}
