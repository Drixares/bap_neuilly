"use client";

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react";
import { ImportDialog } from "./import-dialog";

export default function ImportExcelBlock() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsDialogOpen(true)}>
                <Upload className="mr-2 size-4" />
                Importer des créateurs (Excel)
            </Button>

            <ImportDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                maxSize={10 * 1024 * 1024} // 10MB
                acceptedFileTypes={[
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "application/vnd.ms-excel",
                ]}
            />
        </>
    );
}
