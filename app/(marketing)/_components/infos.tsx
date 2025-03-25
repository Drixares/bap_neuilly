// components/InfoSection.tsx
import Image from 'next/image';
import React from 'react';

const InfoSection: React.FC = () => {
  return (
    <section id="premier" className="py-16 px-4 bg-[var(--beige)]">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl">
        <div className="space-y-8">
          <div className="overflow-hidden ">
            <Image 
              src="/img/image 9.png" 
              alt="Event image" 
              className="w-full h-auto"
              width={400} 
              height={300}
            />
          </div>
          <div className=" flex gap-12 flex-col">
              <h1 className="leading-none text-[65px] text-[var(--marronf)] text-center max-w-[726px] mx-auto">+ 40<br/>Exposants</h1>
              <h1 className="leading-none text-[65px] text-[var(--marronf)] text-center max-w-[726px] mx-auto">+ 5000<br/>visiteurs</h1>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-2xl font-semibold mb-6 text-[var(--marronf)] ">
            Après une première édition couronée de succès,
            le salon des créateurs revient au théatre des
            sablons.
          </h3>
          <hr className="border-t-2 border-[var(--marronc)] w-1/4 mb-6"/>
          <p className="text-lg leading-relaxed text-[var(--marronf)]">
            Avec plus de 5 000 visiteurs et plus de 40 exposants en 2024, le salon des créateurs de Neuilly revient du 29 au 30 Octobre 2025 au théâtre des sablons !
            <br/><br/>
            Avec plus de 400 m², plus de 40 stands, le salon des créateurs est l'événement de l'année.
            <br/><br/>
            Entre commerces artisanaux emblématiques de Neuilly-sur-Seine et une programmation conviviale, les visiteurs pourront cette année encore
            profiter de deux jours de découverte et de rencontre au cœur du savoir-faire local.
            <br/><br/>
            Les artisans et commerçants de Neuilly-sur-Seine auront l'occasion d'y présenter leurs créations uniques. Tout au long de l'événement, une ambiance musicale chaleureuse accompagnera les visiteurs pour une expérience immersive et conviviale.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;