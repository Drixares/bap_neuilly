import "server-only";

import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function adminUserExists() {
    const adminUser = await db.query.user.findFirst({
        where: eq(user.role, "admin"),
    });

    return adminUser !== null && adminUser !== undefined;
}
