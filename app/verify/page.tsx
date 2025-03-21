"use client"

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { verifyTokenAction } from "@/actions/verify-token-action";
import { getUserId, updateVerification } from "@/actions/verified-email";
import { postEmailVerification } from "@/actions/verified-email";

export default function Home() {
    const searchUser = useSearchParams();
    const [token, setToken] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const tokenFromUrl = searchUser.get('token');
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
            processVerification(tokenFromUrl);
        } else {
            setIsLoading(false);
        }
    }, [searchUser]);

    const processVerification = async (tokenValue: string) => {
        try {
            // Use the server action wrapper
            const result = await verifyTokenAction(tokenValue);
            
            if (result.success && result.email) {
                setEmail(result.email);
                
                // Continue with verification flow
                const userId = await getUserId(result.email);
                await postEmailVerification(userId);
                await updateVerification(userId);
                
                setIsVerified(true);
            } else {
                throw new Error('Invalid token');
            }
        } catch (error) {
            console.error('Verification failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
            
            {isLoading ? (
                <p>Vérification en cours...</p>
            ) : isVerified ? (
                <div className="text-green-600">
                    <p>Votre email a été vérifié avec succès!</p>
                </div>
            ) : (
                <p className="text-red-600">Impossible de vérifier votre email. Le lien est peut-être expiré ou invalide.</p>
            )}
        </div>
    );
}