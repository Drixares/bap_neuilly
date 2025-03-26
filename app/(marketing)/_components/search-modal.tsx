import SearchBar from "./search-bar";
import ThematiquesBlock from "./thematiques-block";

export default function SearchModal() {
    return (
        <div className="flex flex-col gap-2 p-4 bg-[#C4742C] h-[30%] border-none rounded-xl ml-16 drop-shadow-2xl">
            <SearchBar />
            <p>Thématiques</p>
            <ThematiquesBlock/>
        </div>
    );
}