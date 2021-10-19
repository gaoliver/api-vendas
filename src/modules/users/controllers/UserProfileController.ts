import { Request, Response } from 'express';

import GetUserProfileService from '../services/GetUserProfileService';
import UpdateUserService from '../services/UpdateUserService';

export default class UserProfileController {
    public async get(request: Request, response: Response): Promise<Response> {
        const getUser = new GetUserProfileService();

        const { id } = request.user;

        const userProfile = await getUser.execute({ id });

        return response.json(userProfile);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password, old_password } = request.body;
        const { id } = request.user;

        const updateUser = new UpdateUserService();

        const user = await updateUser.execute({
            id,
            name,
            email,
            password,
            old_password,
        });

        return response.json(user);
    }
}
