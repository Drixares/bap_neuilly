import {
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
