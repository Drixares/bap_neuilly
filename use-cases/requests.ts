import { getRequests, getRequestsWithUserInfo } from "@/data-access/requests";
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