import auth from '@config/auth';
import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export default function IsAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT Token is missing.');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decodeToken = verify(token, auth.jwt.secret);

        return next();
    } catch {
        throw new AppError('Invalid JWT Token.');
    }
}