import { Request, Response } from 'express';

import ResetPasswdService from '../services/ResetPasswdService';

export default class ResetPsswdController {
    // Default create user
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { password, token } = request.body;

        const resetPsswdEmail = new ResetPasswdService();

        await resetPsswdEmail.execute({
            password,
            token,
        });

        return response.status(204).json();
    }
}
