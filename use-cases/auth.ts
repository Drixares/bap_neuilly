import { verifyCreator } from "@/data-access/creators";
import { auth } from "@/lib/auth";
import { verifyToken } from "@/lib/email-token";

export const verifyTokenUseCase = async (token: string) => {
    const decoded = await verifyToken(token);
    if (!decoded) {
        return {
            success: false,
            email: null,
            message: "Token invalide",
        };
    }

    return {
        success: true,
        email:
            typeof decoded === "object" && "email" in decoded
                ? String(decoded.email)
                : null,
    };
};

export const verifyCreatorUseCase = async (userId: string) => {
    try {
        await verifyCreator(userId);
        return true;
    } catch (error) {
        return false;
    }
};

export const loginCreatorUseCase = async (email: string, password: string) => {
    await auth.api.signInEmail({
        body: {
            email,
            password,
        },
    });
};
