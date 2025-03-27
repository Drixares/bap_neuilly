import Footer from "../_components/footer";
import Header from "../_components/header";

export default function Home() {
    return(
        <>
            <Header/>
            <main>
                <div className="flex flex-col items-center justify-start bg-[var(--beige)] py-64 gap-64">
                    <div className="flex flex-col gap-8 items-center">
                        <h2 className="text-5xl font-bold text-[var(--marronf)]">Date, Horaires et Lieu</h2>
                        <p className=" text-lg text-[var(--marronr)] font-bold"><span className="text-[#C4742C]">Comment </span> et <span className="text-[#C4742C]">quand</span> venir au salon des créateurs de Neuilly-sur-Seine ?</p>
                    </div>
                    <div className="flex flex-col gap-8 items-center">
                        <h3 className="text-4xl font-bold text-[var(--marronf)]">Le 29 Novembre de <span className="text-[#C4742C]">09h30</span> à <span className="text-[#C4742C]">18h00</span></h3>
                        <h3 className="text-4xl font-bold text-[var(--marronf)]">Le 30 Novembre de <span className="text-[#C4742C]">09h30</span> à <span className="text-[#C4742C]">18h00</span>.</h3>
                    </div>
                    <div className="flex flex-col gap-8 items-center">
                        <h3 className="text-4xl font-bold text-[var(--marronf)]">Théâtre des Sablons</h3>
                        <h3 className="text-4xl font-bold text-[var(--marronf)] underline">70 av. du roule, 92200 Neuilly-sur-Seine</h3>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}