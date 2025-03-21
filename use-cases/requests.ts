import { deleteRequest, getRequests, getRequestsWithUserInfo, updateRequestStatus } from "@/data-access/requests";
import { requestStatusEnum } from "@/db/schema/auth-schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getRequestsUseCase = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        throw new Error("Unauthorized");
    }

    const requests = await getRequests();
    return requests;
};

export const getRequestsWithUserInfoUseCase = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        throw new Error("Unauthorized");
    }
    
    const requests = await getRequestsWithUserInfo();
    return requests;
};

export const deleteRequestUseCase = async (requestId: string) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        throw new Error("Unauthorized");
    }

    await deleteRequest(requestId);
};

export const updateRequestStatusUseCase = async (requestId: string, status: typeof requestStatusEnum.enumValues[number]) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        throw new Error("Unauthorized");
    }

    if (!requestStatusEnum.enumValues.includes(status)) {
        throw new Error("Invalid status");
    }

    await updateRequestStatus(requestId, status);
};

