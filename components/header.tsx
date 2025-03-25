// components/Header.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="p-[25px] flex flex-row bg-[var(--beige)]">
      <div className="h-[99px] w-auto">
        <Image 
          src="/img/image 7.png" 
          alt="logo" 
          width={150} 
          height={99}
          className="h-full w-auto" 
        />
      </div>
      <nav className="flex gap-[50px] items-center ml-auto">
        <ul className="flex justify-between items-center flex-row gap-[50px] text-[var(--marronf)]">
          <li><Link href="#" className="text-[var(--marronf)] hover:text-[var(--marronc)] transition-colors duration-300">Liste des créateurs</Link></li>
          <li><Link href="#" className="text-[var(--marronf)] hover:text-[var(--marronc)] transition-colors duration-300">Dates, horaires et lieu</Link></li>
          <li><Link href="#" className="text-[var(--marronf)] hover:text-[var(--marronc)] transition-colors duration-300">Info et plan d'accès</Link></li>
        </ul>
        <ul className="flex justify-between items-center flex-row gap-[25px]">
          <li>
            <Link href="" className="text-[var(--marronf)] hover:text-[var(--marronc)] transition-colors duration-300">
              <Image 
                src="/icon/Facebook.png" 
                alt="Facebook" 
                width={25} 
                height={25}
                className="h-[25px] w-auto" 
              />
            </Link>
          </li>
          <li>
            <Link href="" className="text-[var(--marronf)] hover:text-[var(--marronc)] transition-colors duration-300">
              <Image 
                src="/icon/Vector-1.png" 
                alt="Social media" 
                width={25} 
                height={25}
                className="h-[25px] w-auto" 
              />
            </Link>
          </li>
          <li>
            <Link href="" className="text-[var(--marronf)] hover:text-[var(--marronc)] transition-colors duration-300">
              <Image 
                src="/icon/Vector.png" 
                alt="Social media" 
                width={25} 
                height={25}
                className="h-[25px] w-auto" 
              />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;