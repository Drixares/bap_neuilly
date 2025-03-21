import { db } from "@/db";
import { request } from "@/db/schema/auth-schema";
import crypto from "crypto";

export async function seedRequests(users: { id: string }[]) {
    const requests = [
        {
            id: crypto.randomUUID(),
            userId: users[0].id,
            content: "Je souhaite créer une nouvelle collection de produits artisanaux.",
            status: "en cours" as const,
        },
        {
            id: crypto.randomUUID(),
            userId: users[0].id,
            content: "Demande d'ajout de nouveaux types de produits dans le catalogue.",
            status: "validée" as const,
        },
        {
            id: crypto.randomUUID(),
            userId: users[1].id,
            content: "Proposition de partenariat pour une exposition commune.",
            status: "en cours" as const,
        },
        {
            id: crypto.randomUUID(),
            userId: users[1].id,
            content: "Demande de modification des informations de mon entreprise.",
            status: "rejetée" as const,
        },
    ];

    await db.insert(request).values(requests);
    return requests;
} 