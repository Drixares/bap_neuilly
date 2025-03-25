// components/Artisan.tsx
import React from 'react';
import Image from 'next/image';

const Artisan: React.FC = () => {
  return (
    <section id="deuxieme" className="bg-[var(--beige)] py-16 relative">            
      <Image src="/elem/Ellipse4.png" alt="elem" width={220} height={180} className="absolute left-0 bottom-20 rotate-180 hidden xl:block"/>
      <Image src="/elem/Ellipse5.png" alt="elem" width={220} height={180} className="absolute -left-10 -bottom-4 rotate-180 hidden xl:block"/>
      <Image src="/elem/Ellipse2.png" alt="elem" width={280} height={180} className="absolute -right-25 top-20 rotate-220 hidden xl:block"/>
      <Image src="/elem/Ellipse3.png" alt="elem" width={120} height={180} className="absolute right-0 top-35 rotate-180 hidden xl:block"/>
      <div className="container mx-auto px-4 md:px-8 max-w-6xl flex flex-col items-center relative z-10">
        <div className="mb-8 w-lg">
          <Image 
            src="/img/468865713_983477167141923_6893931052614006797_n 2.png" 
            alt="Local artisans" 
            className="w-full h-auto"
            width={600} 
            height={400}
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[var(--marronf)]">Plongez au cœur de l'artisanat local !</h1>
        <hr className="border-t-2 border-[var(--marronc)]  w-1/4 mx-auto mb-8"/>
        <p className="text-lg leading-relaxed max-w-4xl mx-auto text-center text-[var(--marronf)]">
          Plongez au cœur de l'artisanat local ! <br/>
          Le Salon des Créateurs de Neuilly-sur-Seine vous invite à découvrir le talent et le savoir-faire des artisans et commerçants de votre ville
          <br/><br/>
          Pendant deux jours, rencontrez des créateurs passionnés, explorez des univers uniques et repartez avec des pièces fabriquées à la main. Bijoux, décoration, mode, bien-être, gastronomie… chaque stand est une invitation à la découverte.
          <br/><br/>
          Profitez également d'ateliers interactifs, de démonstrations en direct et d'un espace gourmand pour une expérience immersive et conviviale. Venez soutenir l'artisanat local et laissez-vous inspirer par la créativité de Neuilly-sur-Seine !
        </p>
      </div>
    </section>
  );
};

export default Artisan;