import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

if (!process.env.JWT_SECRET) {
    throw new Error("Key environment variable is not set");
}

export async function createToken(email: string) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
        expiresIn: "2W",
    });
    return token;
}

export async function verifyToken(token: string) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        return decoded;
    } catch (error) {
        return null;
    }
}
