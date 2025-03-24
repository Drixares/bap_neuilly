import { db } from "@/db";
import { businessInfo, user } from "@/db/schema/auth-schema";
import crypto from "crypto";

export async function seedUsers() {
    const users = [
        {
            id: crypto.randomUUID(),
            name: "Paul boiseaubert",
            email: "paul.boiseaubert@gmail.com",
            emailVerified: true,
            role: "user",
            businessInfo: {
                companyName: "Paul's Company",
                siretNum: "12345678901234",
                productTypes: "Produits artisanaux",
                phone: "0612345678",
                website: "https://pauls-company.com",
                businessDescription: "Une entreprise artisanale de qualité",
            },
        },
        {
            id: crypto.randomUUID(),
            name: "John Doe",
            email: "john.doe@example.com",
            emailVerified: true,
            role: "user",
            businessInfo: {
                companyName: "Jane's Crafts",
                siretNum: "98765432109876",
                productTypes: "Artisanat d'art",
                phone: "0698765432",
                website: "https://janes-crafts.com",
                businessDescription: "Créations artisanales uniques",
            },
        },
    ];

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
