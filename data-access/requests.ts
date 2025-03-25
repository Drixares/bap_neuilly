import "server-only";

import { db } from "@/db";
import {
    businessInfo,
    NewRequest,
    request,
    requestStatusEnum,
    user,
} from "@/db/schema/auth-schema";
import { count, eq } from "drizzle-orm";

export const createRequest = async (requestData: NewRequest) => {
    const [newRequest] = await db
        .insert(request)
        .values(requestData)
        .returning();
    return newRequest;
};

export const getRequests = async () => {
    const requests = await db.select().from(request);
    return requests;
};

export const getRequestById = async (id: string) => {
    const req = await db.select().from(request).where(eq(request.id, id));
    return req;
};

export const updateRequest = async (id: string, requestData: NewRequest) => {
    const [updatedRequest] = await db
        .update(request)
        .set(requestData)
        .where(eq(request.id, id))
        .returning();
    return updatedRequest;
};

export const updateRequestStatus = async (
    id: string,
    status: (typeof requestStatusEnum.enumValues)[number]
) => {
    await db.update(request).set({ status }).where(eq(request.id, id));
};

export const deleteRequest = async (id: string) => {
    await db.delete(request).where(eq(request.id, id));
};

export const getRequestsByUserId = async (userId: string) => {
    const requests = await db
        .select()
        .from(request)
        .where(eq(request.userId, userId));
    return requests;
};

export const getRequestsByStatus = async (
    status: (typeof requestStatusEnum.enumValues)[number]
) => {
    const requests = await db
        .select()
        .from(request)
        .where(eq(request.status, status));
    return requests;
};

export const getNumberOfRequests = async () => {
    const requests = await db
        .select({
            count: count(),
        })
        .from(request);
    return requests[0].count;
};

export const getRequestsWithUserInfo = async () => {
    const requests = await db
        .select({
            request: {
                id: request.id,
                content: request.content,
                status: request.status,
                createdAt: request.createdAt,
                updatedAt: request.updatedAt,
                userId: request.userId,
            },
            user: {
                name: user.name,
                email: user.email,
            },
            businessInfo: {
                phone: businessInfo.phone,
            },
        })
        .from(request)
        .innerJoin(user, eq(request.userId, user.id))
        .leftJoin(businessInfo, eq(user.id, businessInfo.userId));

    return requests.map((req) => ({
        ...req.request,
        user: {
            name: req.user.name,
            email: req.user.email,
            businessInfo: req.businessInfo,
        },
    }));
};
