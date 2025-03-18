import { db } from "@/db";
import { user } from "@/db/schema";
import { count, eq } from "drizzle-orm";

export async function getStats() {
    const numberCreators = await db
        .select({
            count: count(),
        })
        .from(user)
        .where(eq(user.role, "user"));

    const numberVerifiedCreators = await db
        .select({
            count: count(),
        })
        .from(user)
        .where(eq(user.role, "user") && eq(user.emailVerified, true));

    return {
        numberCreators: numberCreators[0].count,
        numberVerifiedCreators: numberVerifiedCreators[0].count,
    };
}
