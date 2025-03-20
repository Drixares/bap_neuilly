import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getNumberOfDocuments } from "./documents";

export async function getStats() {
    const numberCreators = await db
        .select({
            id: user.id,
            emailVerified: user.emailVerified,
        })
        .from(user) 
        .where(eq(user.role, "user"));

    const numberVerifiedCreators = numberCreators.filter((creator) => creator.emailVerified); 
    const numberDocuments = await getNumberOfDocuments();

    return {
        numberCreators: numberCreators.length,
        numberVerifiedCreators: numberVerifiedCreators.length,
        numberDocuments: numberDocuments,
    };
}
