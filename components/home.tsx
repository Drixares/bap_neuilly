// components/Banner.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Home: React.FC = () => {
  return (
    <section id="acceuil" className="bg-[var(--beige)] py-24 text-center relative">
      <Image src="/elem/Ellipse1.png" alt="elem" width={270} height={180} className="absolute left-0 -bottom-10 hidden xl:block"/>
      <Image src="/elem/Ellipse2.png" alt="elem" width={270} height={180} className="absolute left-25 bottom-10 hidden xl:block"/>
      <Image src="/elem/Ellipse3.png" alt="elem" width={175} height={90} className="absolute left-0 -bottom-4 hidden xl:block"/>
      <Image src="/elem/Ellipse4.png" alt="elem" width={190} height={180} className="absolute right-0 -bottom-1 hidden xl:block"/>
      <Image src="/elem/Ellipse5.png" alt="elem" width={320} height={180} className="absolute right-0 -bottom-40 hidden xl:block"/>
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--marronf)]">Découvrez le talent des créateurs et artisans de Neuilly-sur-Seine !</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-[var(--marronf)]">avec le salon des créateurs de neuilly-sur-seine</h2>
        <h2 className="text-2xl md:text-3xl font-semibold text-[var(--marronc)]">du 29 au 3O novembre</h2>
      </div>
      <div>
        <Link href="#" className="inline-block bg-[var(--marronc)] hover:bg-[var(--marronf)] text-white font-bold py-3 px-8 rounded-xl tracking-wide transition-colors">
          inscrivez-vous dès maintenant !
        </Link>
      </div>
    </section>
  );
};

export default Home;