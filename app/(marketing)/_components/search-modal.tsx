"use client"
import SearchBar from "./search-bar";
import ThematiquesBlock from "./thematiques-block";
import { useState } from "react";

interface SearchModalProps {
    onSearch: (term: string) => void;
    searchTerm?: string; 
}

export default function SearchModal({ onSearch, searchTerm = '' }: SearchModalProps) {

    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
    
    // Gérer le changement dans le champ de recherche
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTerm = e.target.value;
        setLocalSearchTerm(newTerm);
        onSearch(newTerm); // Transmettre la recherche au composant parent immédiatement
    };
    return (
        <div className="flex flex-col gap-2 p-4 bg-[#C4742C] h-[30%] border-none rounded-xl ml-16 drop-shadow-2xl">
            <SearchBar 
                value={searchTerm || localSearchTerm}
                onChange={handleInputChange}
                placeholder="Rechercher un Exposant"/>
            <p>Thématiques</p>
            <ThematiquesBlock/>
        </div>
    );
}