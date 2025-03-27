import Footer from "../_components/footer";
import Header from "../_components/header";

export default function Home() {
    return(
        <>
            <Header/>
            <main>
                <div className="flex flex-col items-center justify-start bg-[var(--beige)] py-64 px-16 gap-56">
                    <div className="flex flex-col gap-8 items-center">
                        <h2 className="text-5xl font-bold text-[var(--marronf)]">Date, Horaires et Lieu</h2>
                        <p className=" text-lg text-[var(--marronr)] font-bold"><span className="text-[#C4742C]">Comment </span> et <span className="text-[#C4742C]">quand</span> venir au salon des créateurs de Neuilly-sur-Seine ?</p>
                    </div>
                    <div className="flex flex-col gap-8 items-center">
                        <h3 className="text-4xl font-bold text-[var(--marronf)]">Le 29 Novembre de <span className="text-[#C4742C]">09h30</span> à <span className="text-[#C4742C]">18h00</span></h3>
                        <h3 className="text-4xl font-bold text-[var(--marronf)]">Le 30 Novembre de <span className="text-[#C4742C]">09h30</span> à <span className="text-[#C4742C]">18h00</span>.</h3>
                    </div>
                    <div className="bg-[#C4742C] w-[60%] flex justify-center items-center rounded-xl p-8">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d655.9206209838362!2d2.2751937696639906!3d48.88332919820847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66563d0372097%3A0x5faba921c9631d7c!2zVGjDqcOidHJlIGRlcyBTYWJsb25z!5e0!3m2!1sfr!2sfr!4v1743095114196!5m2!1sfr!2sfr" 
                            width="600" 
                            height="450" 
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                    <div className="flex flex-col gap-8 items-center">
                        <h3 className="text-4xl font-bold text-[var(--marronf)]">Théâtre des Sablons</h3>
                        <h3 className="text-4xl font-bold text-[var(--marronf)] underline">70 av. du roule, 92200 Neuilly-sur-Seine</h3>
                    </div>
                    <div className="flex flex-row gap-16 items-center">
                        <div className="flex flex-col items-center gap-4">
                            <h4 className="text-[var(--marronf)] text-lg font-bold">Transports en commun</h4>
                            <div className="text-[var(--marronf)]">
                                <p><span className="font-bold">Metro</span> : Ligne 1 - Sablons - sortie Avenue de Roule (5 minutes à pieds)</p>
                                <span className="font-bold">Bus:</span>
                                <ul className="text-[var(--marronf)] ml-8">
                                    <li>43 - Sablons</li>
                                    <li>73 - Sablons</li>
                                    <li>82 - Sablons</li>
                                    <li>93 - Sablons</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <h4 className="text-[var(--marronf)] text-lg font-bold">En Voiture</h4>
                            <div className="text-[var(--marronf)]">
                                <span className="font-bold">Parking Indigo Neuilly Mairie</span>
                                <p>Rue du Château, 92200 Neuilly-sur-Seine</p>

                                <span className="font-bold">Parking Indigo Les Sablons</span>
                                <ul className="ml-8">
                                    <li>Avenue Charles de Gaulle, 92200 Neuilly-sur-Seine Parking 1</li>
                                    <li>2 Rue d’Orléans, 92200 Neuilly-sur-Seine Parking 2</li>
                                </ul>

                                <p>Accès par Avenue du Roule, 92200 Neuilly-sur-Seine</p>
                                <span className="text-[var(--marronf)] font-bold">Pensez au covoiturage et aux mobilités douces pour un accès plus responsable ! 🚲🚶‍♂️</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}