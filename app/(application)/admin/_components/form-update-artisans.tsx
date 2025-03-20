"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { UpdateBusinessAction } from "@/actions/update-business";
import { getBusinessInfoByArtisanId } from "@/actions/fetch-business-data";
import { Button } from "@/components/ui/button";

interface BusinessInfo {
    id: string;
    userId: string;
    companyName: string;
    siretNum: string | null;
    productTypes: string;
    businessDescription?: string | null;
    registrationNumber?: string | null;
    phone: string;
    website?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export default function FormUpdateArtisans({
    artisanId,
}: {
    artisanId: string;
}) {
    const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        companyName: "",
        siretNum: "",
        productTypes: "",
        businessDescription: "",
        phone: "",
        website: "",
    });

    const [updateStatus, setUpdateStatus] = useState({
        message: "",
        isError: false,
    });

    useEffect(() => {
        if (!artisanId) {
            console.error("artisanId manquant");
            setError("ID d'artisan manquant ou invalide");
            setLoading(false);
            return;
        }
        async function fetchBusinessInfo() {
            try {
                setLoading(true);
                setError(null);

                const business = await getBusinessInfoByArtisanId(artisanId);
                console.log("Données business récupérées:", business);

                if (business) {
                    setBusinessInfo(business);
                    setFormData({
                        companyName: business.companyName || "",
                        siretNum: business.siretNum || "",
                        productTypes: business.productTypes || "",
                        businessDescription: business.businessDescription || "",
                        phone: business.phone || "",
                        website: business.website || "",
                    });
                } else {
                    setError(
                        "Aucune information d'entreprise trouvée pour cet artisan"
                    );
                }
            } catch (err) {
                console.error(
                    "Erreur lors de la récupération des données:",
                    err
                );
                setError(
                    "Erreur lors de la récupération des informations d'entreprise"
                );
            } finally {
                setLoading(false);
            }
        }

        if (artisanId) {
            fetchBusinessInfo();
        }
    }, [artisanId]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (!businessInfo || !businessInfo.id) {
                setUpdateStatus({
                    message: "Informations d'entreprise non disponibles",
                    isError: true,
                });
                return;
            }

            const result = await UpdateBusinessAction(
                businessInfo.id,
                formData.companyName,
                formData.siretNum,
                formData.productTypes,
                formData.phone,
                formData.businessDescription,
                formData.website
            );

            setUpdateStatus({
                message: "Informations mises à jour avec succès",
                isError: false,
            });
        } catch (error) {
            console.error("Erreur lors de la mise à jour:", error);
            setUpdateStatus({
                message: "Échec de la mise à jour",
                isError: true,
            });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center p-4">
                Chargement des informations...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4">
                <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
                    {error}
                </div>
                <Button
                    onClick={() => setError(null)}
                    className="bg-primary/90 hover:bg-primary"
                >
                    Réessayer
                </Button>
            </div>
        );
    }

    return (
        <form className="flex flex-col mt-8 gap-8" onSubmit={handleSubmit}>
            {updateStatus.message && (
                <div
                    className={`p-2 rounded ${updateStatus.isError ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
                >
                    {updateStatus.message}
                </div>
            )}
            <div>
                <label>Nom d'entreprise</label>
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
            </div>
            <div>
                <label>Numéro de Siret</label>
                <input
                    type="text"
                    name="siretNumber"
                    id="siretNumber"
                    placeholder="Numéro de SIRET"
                    className="w-full rounded-lg border border-gray-700/50 p-2"
                    required
                    value={formData.siretNum}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Type de Produit</label>
                <input
                    type="text"
                    name="productTypes"
                    id="productTypes"
                    placeholder="Types de produits"
                    className="w-full rounded-lg border border-gray-700/50 p-2"
                    required
                    value={formData.productTypes}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Description de l'entreprise</label>
                <input
                    type="text"
                    name="businessDescription"
                    id="businessDescription"
                    placeholder="Description de l'entreprise"
                    className="w-full rounded-lg border border-gray-700/50 p-2"
                    value={formData.businessDescription}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Numéro de téléphone</label>
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
            </div>
            <div>
                <label>Site Internet</label>
                <input
                    type="text"
                    name="website"
                    id="website"
                    placeholder="Site internet de l'entreprise"
                    className="w-full rounded-lg border border-gray-700/50 p-2"
                    value={formData.website}
                    onChange={handleChange}
                />
            </div>
            <div className="flex justify-end w-full mt-6">
                <Button
                    className="bg-primary/90 hover:bg-primary"
                    type="submit"
                >
                    Sauvegarder
                </Button>
            </div>
        </form>
    );
}
