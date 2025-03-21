"use server"

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey  = process.env.JWT_SECRET!;

if (!secretKey) {
    throw new Error('Key environment variable is not set');
}

export async function createToken (email : string) {
    const token = jwt.sign({ email }, secretKey, { expiresIn: '2W' });    
    return token
}

export async function verifyToken (token : string) {
    const decoded = jwt.verify(token, secretKey);
    return decoded
}