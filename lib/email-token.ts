import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey  = process.env.JWT_SECRET!;
if (!secretKey) {
    throw new Error('Key environment variable is not set');
}

export function createToken (email : string) {
    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
    return token
}

export function verifyToken (token : string) {
    const decoded = jwt.verify(token, secretKey);
    return decoded
}