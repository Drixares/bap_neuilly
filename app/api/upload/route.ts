import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file received." },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create uploads directory if it doesn't exist
        const uploadDir = path.join(process.cwd(), "public/uploads");

        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }

        // Save the file
        const filePath = path.join(uploadDir, file.name);
        await writeFile(filePath, buffer);

        // Return the public URL
        const fileUrl = `/uploads/${file.name}`;

        return NextResponse.json({
            fileUrl,
            fileType: file.type,
            fileSize: file.size.toString(),
        });
    } catch (error) {
        console.error("Error uploading file:", error);
        return NextResponse.json(
            { error: "Error uploading file" },
            { status: 500 }
        );
    }
}
