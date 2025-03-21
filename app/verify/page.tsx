import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
export default function Home() {
    const searchUser = useSearchParams();
    const [token, setToken] = useState<string | null>(null);


    useEffect(() => {
        const tokenFromUrl = searchUser.get('token');
        if (tokenFromUrl) {
          setToken(tokenFromUrl);
          console.log('Token détecté dans l’URL :', tokenFromUrl);
        }
      }, [searchUser])
      
    return (
        <div>
            <h1>Verify your email</h1>
                <p>
                    {token}
                </p>
        </div>
    );
}