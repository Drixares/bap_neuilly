import { db } from "@/db";
import { businessInfo, user } from "@/db/schema/auth-schema";
import { users } from "./datas";

export async function seedUsers() {
    for (const userData of users) {
        const { businessInfo: businessInfoData, ...userDataWithoutBusiness } =
            userData;

        // Insert user
        await db.insert(user).values(userDataWithoutBusiness);

        // Insert business info if exists
        if (businessInfoData) {
            await db.insert(businessInfo).values({
                ...businessInfoData,
                userId: userData.id,
            });
        }
    }

    return users;
}
