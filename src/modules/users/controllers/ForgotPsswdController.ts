import { Request, Response } from 'express';

import SendForgorPsswdEmailService from '../services/SendForgorPsswdEmailService';

export default class ForgotPsswdController {
    // Default create user
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email } = request.body;

        const sendForgotPsswdEmail = new SendForgorPsswdEmailService();

        await sendForgotPsswdEmail.execute({
            email,
        });

        return response.status(204).json();
    }
}
