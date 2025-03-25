// components/Banner.tsx
import React from 'react';
import Image from 'next/image';

const Banner: React.FC = () => {
  return (
    <section id="bandeau" className="bg-[var(--marronf)] py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex flex-col items-center text-center">
          <div className="bg-[var(--beige)] p-4 rounded-full shadow-md mb-4">
            <Image src="/icon/Group.png" alt="Unique creations icon" width={60} height={60} />
          </div>
          <h3 className="text-xl font-semibold">Des créations uniques<br/>et authentiques</h3>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="bg-[var(--beige)] p-4 rounded-full shadow-md mb-4">
            <Image src="/icon/Waving Person - iconSvg.co.png" alt="Meet creators icon" width={60} height={60} />
          </div>
          <h3 className="text-xl font-semibold">Rencontrez les<br/>créateurs</h3>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="bg-[var(--beige)] p-4 rounded-full shadow-md mb-4">
            <Image src="/icon/Paint Tray Holder - iconSvg.co.png" alt="Workshops icon" width={60} height={60} />
          </div>
          <h3 className="text-xl font-semibold">Ateliers &amp; <br/>démonstrations</h3>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="bg-[var(--beige)] p-4 rounded-full shadow-md mb-4">
            <Image src="/icon/Vector.png" alt="Festive ambiance icon" width={60} height={60} />
          </div>
          <h3 className="text-xl font-semibold">Ambiance festive</h3>
        </div>
      </div>
    </section>
  );
};

export default Banner;