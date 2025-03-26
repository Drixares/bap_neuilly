import Image from "next/image";

export default function SearchBar() {
    return (
        <div className="flex flex-row p-2 bg-[var(--beige)] border-none rounded-xl mb-2">
            <input type="text" placeholder="Rechercher" className="p-1 bg-[var(--beige)] text-[#552D08] border-none"/>
            <Image src='/icon/search-icon.svg' width={25} height={25} alt='search icon' />
        </div>
    );
}