import { seedDocuments } from "./documents";
import { seedRequests } from "./requests";
import { seedUsers } from "./users";

async function main() {
    try {
        console.log("🌱 Starting database seeding...");

        // Seed users first
        const users = await seedUsers();
        console.log(`✅ Seeded ${users.length} users`);

        // Seed requests
        const requests = await seedRequests(users);
        console.log(`✅ Seeded ${requests.length} requests`);

        // Seed documents
        const documents = await seedDocuments(users);
        console.log(`✅ Seeded ${documents.length} documents`);

        console.log("✨ Database seeding completed successfully!");
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
}

main(); 