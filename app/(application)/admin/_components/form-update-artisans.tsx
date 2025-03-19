"use client"
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { UpdateBusinessAction } from "@/actions/update-business";
import { Button } from "@/components/ui/button";

interface BusinessInfo {
    id: string;
    companyName?: string;
    businessDescription?: string;
    phone?: string;
    website?: string;
}

export default function FormUpdateArtisans({ artisanId }: {artisanId : string}) {
    const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);

    const [formData, setFormData] = useState({
        companyName: "",
        businessDescription: "",
        phone: "",
        website: ""
    });

    const [updateStatus, setUpdateStatus] = useState({
        message: "",
        isError: false
    });

    useEffect(() => {
        console.log("UseEffect déclenché avec:", artisan);
        console.log("Type de artisan:", typeof artisan);
        console.log("artisan a businessInfo?", artisan && "businessInfo" in artisan);

        if (artisan && artisan.businessInfo) {
            console.log("BusinessInfo trouvé:", artisan.businessInfo);
            setFormData({
                companyName: artisan.businessInfo.companyName || "",
                businessDescription: artisan.businessInfo.businessDescription || "",
                phone: artisan.businessInfo.phone || "",
                website: artisan.businessInfo.website || ""
            });
        } else {
            console.log("BusinessInfo non trouvé");
        }
    }, [artisan]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (!artisan || !artisan.businessInfo || !artisan.businessInfo.id) {
                setUpdateStatus({
                    message: "Informations d'entreprise non disponibles",
                    isError: true
                });
                return;
            }

            const result = await UpdateBusinessAction(
                artisan.businessInfo.id,
                formData.companyName,
                formData.phone,
                formData.businessDescription,
                formData.website
            );

            setUpdateStatus({
                message: "Informations mises à jour avec succès",
                isError: false
            });
        } catch (error) {
            console.error("Erreur lors de la mise à jour:", error);
            setUpdateStatus({
                message: "Échec de la mise à jour",
                isError: true
            });
        }
    };

    return (
        <form className="flex flex-col mt-8 gap-8" onSubmit={handleSubmit}>
            {updateStatus.message && (
                <div className={`p-2 rounded ${updateStatus.isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {updateStatus.message}
                </div>
            )}
            
            <input
                type="text"
                name="companyName"
                id="companyName"
                placeholder="Nom de l'entreprise"
                className="w-full rounded-lg border border-gray-700/50 p-2"
                required
                value={formData.companyName}
                onChange={handleChange}
            />
            
            <input
                type="text"
                name="businessDescription"
                id="businessDescription"
                placeholder="Description de l'entreprise"
                className="w-full rounded-lg border border-gray-700/50 p-2"
                value={formData.businessDescription}
                onChange={handleChange}
            />
            
            <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Numéro de téléphone"
                className="w-full rounded-lg border border-gray-700/50 p-2"
                required
                value={formData.phone}
                onChange={handleChange}
            />
            
            <input
            type="text"
                name="website"
                id="website"
                placeholder="Site internet de l'entreprise"
                className="w-full rounded-lg border border-gray-700/50 p-2"
                value={formData.website}
                onChange={handleChange}
            />
            <div className="flex justify-end w-full mt-6">
                <Button
                    className="bg-primary/90 hover:bg-primary"
                    type="submit"
                >
                    Modifier
                </Button>
            </div>
        </form>
    )
}