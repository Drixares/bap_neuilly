import "server-only";

import { db } from "@/db";
import {
    NewRequest,
    request,
    requestStatusEnum,
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
