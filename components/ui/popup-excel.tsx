"use client"
import { importFileAction } from "@/actions/import";
import { useEffect, useRef, useState } from "react";
import { Button } from "./button";
import DropzoneExcel from "./dropzone-excel";

const popupEvents = {
    open: () => {
      const event = new CustomEvent('openExcelPopup');
      document.dispatchEvent(event);
    }
};

export default function PopupImportExcel() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isImporting, setIsImporting] = useState(false);
    const [importMessage, setImportMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const openPopup = () => setIsOpen(true);
        document.addEventListener('openExcelPopup', openPopup);

        return () => {
            document.removeEventListener('openExcelPopup', openPopup);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        // Attacher l'événement si la popup est ouverte
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // Nettoyage de l'event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleFileSelected = (file: File) => {
        setSelectedFile(file);
        setImportMessage(null);
    };

    const handleImport = async () => {
        if (!selectedFile) return;
        
        setIsImporting(true);
        setImportMessage(null);
        
        try {
            const formData = new FormData();
            formData.append("file", selectedFile);
            
            const result = await importFileAction(formData);
            
            if (result.success) {
                setImportMessage({
                    type: 'success',
                    text: result.message
                });
                setTimeout(() => setIsOpen(false), 2000);
            } else {
                setImportMessage({
                    type: 'error',
                    text: result.message
                });
            }
        } catch (error) {
            setImportMessage({
                type: 'error',
                text: error instanceof Error ? error.message : "Une erreur s'est produite lors de l'importation"
            });
        } finally {
            setIsImporting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-40" />
            <section 
                ref={popupRef}
                className="fixed flex flex-col items-center bg-[#1E1E21] w-[90%] max-w-md h-auto top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 p-6 border border-gray-700/50 rounded-lg shadow-xl"
            >
                <div className="flex justify-between w-full mb-4">
                    <h2 className="text-xl font-medium">Importer les créateurs</h2>
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="text-gray-400 hover:text-white"
                    >
                        &times;
                    </button>
                </div>
                <p className="italic text-sm opacity-70 mb-4">Veuillez importer le fichier Excel (.xlsx / .xls)</p>
                <div className="w-full">
                    <DropzoneExcel onFileSelected={handleFileSelected} />
                </div>
                {importMessage && (
                    <div className={`mt-4 p-2 w-full text-sm rounded ${
                        importMessage.type === 'success' 
                            ? 'bg-green-900/30 text-green-300 border border-green-700' 
                            : 'bg-red-900/30 text-red-300 border border-red-700'
                    }`}>
                        {importMessage.text}
                    </div>
                )}
                
                <div className="flex justify-end w-full mt-6">
                    <Button
                        onClick={handleImport} 
                        disabled={!selectedFile || isImporting}
                        className="bg-primary/90 hover:bg-primary"
                    >
                        {isImporting ? "Importation en cours..." : "Importer le fichier"}
                    </Button>
                </div>
            </section>
        </>
    );
}

export { popupEvents };

