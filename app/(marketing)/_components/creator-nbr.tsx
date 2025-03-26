interface Creator {
    id: string;
    name: string;
    email: string;
    image?: string | null | undefined;
    bio?: string | undefined | null;
}

export default function CreatorNbr({ creator }: { creator: Creator[] }) {
    return  (
        <h2 className="text-[#552D08]">{creator.length} exposants</h2>
    )
}