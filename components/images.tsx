// components/ImageGallery.tsx
import React from 'react';
import Image from 'next/image';

const Images: React.FC = () => {
  return (
    <section id="images" className="bg-[var(--beige)] z-10 min-h-[auto] flex justify-center items-center relative">
      <div className="grid grid-cols-1 md:grid-cols-3 w-full">
        <div className="overflow-hidden h-[300px]">
          <Image 
            src="/img/image 5.png" 
            alt="Gallery image 1" 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            width={400} 
            height={300}
          />
        </div>
        <div className="overflow-hidden h-[300px]">
          <Image 
            src="/img/image 4.png" 
            alt="Gallery image 2" 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            width={400} 
            height={300}
          />
        </div>
        <div className="overflow-hidden h-[300px]">
          <Image 
            src="/img/image 6.png" 
            alt="Gallery image 3" 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            width={400} 
            height={300}
          />
        </div>
      </div>
    </section>
  );
};

export default Images;