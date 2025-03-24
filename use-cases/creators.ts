import {
    getCreatorById,
    getCreatorIdByEmail,
    getCreatorsWithBusinessInfo,
    updateCreatorAndBusinessInfo,
} from "@/data-access/creators";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getCreatorsWithBusinessInfoUseCase = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        throw new Error("Unauthorized");
    }

    const creators = await getCreatorsWithBusinessInfo();
    return creators;
};

export const getCreatorByIdUseCase = async (id: string) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        throw new Error("Unauthorized");
    }

    const creator = await getCreatorById(id);
    return creator;
};

export const updateCreatorUseCase = async (id: string, data: any) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        throw new Error("Unauthorized");
    }

    const isUpdated = await updateCreatorAndBusinessInfo(id, data);
    return isUpdated;
};

export const getCreatorIdByEmailUseCase = async (email: string) => {
    const creatorId = await getCreatorIdByEmail(email);
    return creatorId;
};
