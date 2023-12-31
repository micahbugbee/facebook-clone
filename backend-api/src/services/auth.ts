import bcrypt from 'bcrypt';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { IUser, User } from '../models/user';

const secret = 'May the Force be with you.';

export const hashPassword = async (plainTextPassword: string) => {
    const saltRound = 12;
    const hash = await bcrypt.hash(plainTextPassword, saltRound);
    return hash;
}

export const comparePasswords = async (plainTextPassword: string, hashPassword: string) => {
    return await bcrypt.compare(plainTextPassword, hashPassword);
}

export const signUserToken = async (user: IUser) => {
    let token = jwt.sign(
        { userId: user._id },
        secret,
        { expiresIn: '1hr' }
    );
    return token;
}

export const verifyUser = async (req: Request) => {
    // Get the authorization header from the request
    const authHeader = req.headers.authorization;

    // If header exists, parse token from `Bearer <token>`
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        // Verify the token and get the user
        try {
            let decoded: any = await jwt.verify(token, secret);
            return await User.findById(decoded.userId);
        }
        catch (err) {
            return null;
        }
    }
    else {
        return null;
    }
}