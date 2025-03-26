export default function ThematiquesBlock() {
    return (
        <div className='flex flex-col gap-2 p-2 bg-[var(--beige)] h-[30%] border-none rounded-xl'>
            <div className='flex flex-row gap-2 bg-[var(--beige)] border-none rounded-xl'>
                <input type="checkbox" className="bg-[var(--beige)]" id="artisanat-decoration" name="artisanat-decoration" value="artisanat-decoration" />
                <label htmlFor="artisanat-decoration" className="bg-[#C4742C] text-[var(--beige)] w-full px-1  border-0 rounded-sm">Artisanat & Décorations</label>
            </div>

            <div className='flex flex-row gap-2 bg-[var(--beige)] border-none rounded-xl'>
                <input type="checkbox" className="bg-[var(--beige)]" id="mode-accessoires" name="mode-accessoires" value="mode-accessoires" />
                <label htmlFor="mode-accessoires" className="bg-[#C4742C] text-[var(--beige)] w-full px-1 border-0 rounded-sm">Mode & Accessoires</label>
            </div>

            <div className='flex flex-row gap-2 bg-[var(--beige)] border-none rounded-xl'>
                <input type="checkbox" className="bg-[var(--beige)]" id="art-illustrations" name="art-illustrations" value="art-illustrations" />
                <label htmlFor="art-illustrations" className="bg-[#C4742C] text-[var(--beige)] w-full px-1 border-0 rounded-sm">Art & Illustrations</label>
            </div>

            <div className='flex flex-row gap-2 bg-[var(--beige)] border-none rounded-xl'>
                <input type="checkbox" className="bg-[var(--beige)]" id="bien_etre-maison" name="bien_etre-maison" value="bien_etre-maison" />
                <label htmlFor="bien_etre-maison" className="bg-[#C4742C] text-[var(--beige)] w-full px-1 border-0 rounded-sm">Bien-être & Maison</label>
            </div>

            <div className='flex flex-row gap-2 bg-[var(--beige)] border-none rounded-xl'>
                <input type="checkbox" className="bg-[var(--beige)]" id="gastronomie-saveurs_locales" name="gastronomie-saveurs_locales" value="gastronomie-saveurs_locales" />
                <label htmlFor="gastronomie-saveurs_locales" className="bg-[#C4742C] text-[var(--beige)] w-full px-1 border-0 rounded-sm">Gastronomie & Saveurs locales</label>
            </div>

            <div className='flex flex-row gap-2 bg-[var(--beige)] border-none rounded-xl'>
                <input type="checkbox" className="bg-[var(--beige)]" id="eco_createurs" name="eco_createurs" value="eco_createurs" />
                <label htmlFor="eco_createurs" className="bg-[#C4742C] text-[var(--beige)] w-full px-1 border-0 rounded-sm">Éco-Créateurs</label>
            </div>

            <div className='flex flex-row gap-2 bg-[var(--beige)] border-none rounded-xl'>
                <input type="checkbox" className="bg-[var(--beige)]" id="metaux-bois-matieres_brutes" name="metaux-bois-matieres_brutes" value="metaux-bois-matieres_brutes" />
                <label htmlFor="metaux-bois-matieres_brutes" className="bg-[#C4742C] text-[var(--beige)] w-full px-1 border-0 rounded-sm">Métaux, Bois & Matières brutes</label>
            </div>

            <div className='flex flex-row gap-2 bg-[var(--beige)] border-none rounded-xl'>
                <input type="checkbox" className="bg-[var(--beige)]" id="papeterie-univers_livre" name="papeterie-univers_livre" value="papeterie-univers_livre" />
                <label htmlFor="papeterie-univers_livre" className="bg-[#C4742C] text-[var(--beige)] w-full px-1 border-0 rounded-sm">Papeterie & univers du livre</label>
            </div>
            
        </div>
    );
}