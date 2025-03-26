import Image from "next/image";
import Link from "next/link";

interface CreatorCardProps {
    Creator: Creator;
    Business?: Business | null;
}
interface Creator {
    id: string;
    name: string;
    email: string;
    image?: string | null | undefined;
    bio: string | null | undefined;
    businessInfo?: Business;
}

interface Business {
    id: string;
    companyName: string;
    siretNum?: string;
    businessDescription?: string;
    productTypes: string;
    phone: string;
    website?: string;
}

export default function CreatorCard({ Creator, Business }: CreatorCardProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg overflow-hidden drop-shadow-xl min-w-[1/4]">
            <div className="relative w-56 h-64 aspect-[4/3] rounded-t-xl overflow-hidden">
                <Image 
                    src='/img/image 6.png' 
                    alt="Creator Photo" 
                    fill
                    className="object-cover"
                />
            </div> 
            <div className="flex flex-col gap-4 items-start justify-center p-4  bg-[#C4742C] w-full">
                <h3>{Creator.name}</h3>
                <p className="text-sm">{Business!.productTypes}</p>
                {Business?.website ? (
                    <Link href={Business.website}>Site Web</Link>
                ) : (
                    <p className="text-sm">Site Web non renseigné</p>
                )}
            </div>
        </div>
    )
}
