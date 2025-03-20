import {
    createDocument,
    deleteDocument,
    getDocuments,
} from "@/data-access/documents";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getDocumentsUseCase = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        throw new Error("Unauthorized");
    }

    const documents = await getDocuments();
    return documents;
};

export const createDocumentUseCase = async (
    title: string,
    file: File,
    description?: string
) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        throw new Error("Unauthorized");
    }

    const document = await createDocument(
        title,
        file,
        session.user.id,
        description
    );
    return document;
};

export const deleteDocumentUseCase = async (id: string) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        throw new Error("Unauthorized");
    }

    await deleteDocument(id);
};
