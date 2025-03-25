// components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--marronf)] text-white py-12 z-10 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between items-start">
          {/* BLOC 1: Logo */}
          <div className="w-full md:w-1/4 flex justify-center md:justify-start mb-8 md:mb-0">
            <div className="h-[100px] w-auto">
              <Image 
                src="/img/image 7.png" 
                alt="logo" 
                width={180} 
                height={100}
                className="h-full w-auto" 
              />
            </div>
          </div>
          
          {/* BLOC 2: Colonnes de liens */}
          <div className="w-full md:w-2/4 grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8 md:mb-0">
            <div className="flex flex-col items-center sm:items-start">
              <h3 className="text-xl font-semibold mb-6 uppercase">Contact</h3>
              <div className="flex flex-col items-center sm:items-start space-y-4">
                <Link href="" className="hover:text-[var(--beige)] transition-colors">Facebook</Link>
                <Link href="" className="hover:text-[var(--beige)] transition-colors">Linkedin</Link>
                <Link href="" className="hover:text-[var(--beige)] transition-colors">Instagram</Link>
              </div>
            </div>
            
            <div className="flex flex-col items-center sm:items-start">
              <h3 className="text-xl font-semibold mb-6 uppercase">liens utiles</h3>
              <div className="flex flex-col items-center sm:items-start space-y-4">
                <Link href="" className="hover:text-[var(--beige)] transition-colors">Devenir exposant</Link>
                <Link href="" className="hover:text-[var(--beige)] transition-colors">Accès et logistique</Link>
                <Link href="" className="hover:text-[var(--beige)] transition-colors">Instagram</Link>
              </div>
            </div>
            
            <div className="flex flex-col items-center sm:items-start">
              <h3 className="text-xl font-semibold mb-6 uppercase">mentions légales</h3>
              <div className="flex flex-col items-center sm:items-start space-y-4">
                <Link href="" className="hover:text-[var(--beige)] transition-colors">Mentions légales</Link>
                <Link href="" className="hover:text-[var(--beige)] transition-colors">Politique de confidentialité</Link>
                <Link href="" className="hover:text-[var(--beige)] transition-colors">Crédits et partenaires</Link>
              </div>
            </div>
          </div>
          
          {/* BLOC 3: Réseaux sociaux */}
          <div className="w-full md:w-1/4 flex justify-center md:justify-end">
            <ul className="flex md:flex-row gap-6">
              <li>
                <Link href="" className="text-white hover:text-[var(--beige)] transition-colors duration-300">
                  <div className="bg-[var(--beige)] p-1.5 rounded-full">
                    <Image 
                      src="/icon/Facebook.png" 
                      alt="Facebook" 
                      width={28} 
                      height={28}
                      className="h-[28px] w-auto" 
                    />
                  </div>
                </Link>
              </li>
              <li>
                <Link href="" className="text-white hover:text-[var(--beige)] transition-colors duration-300">
                  <div className="bg-[var(--beige)] p-1.5 rounded-full">
                    <Image 
                      src="/icon/Vector-1.png" 
                      alt="Social media" 
                      width={28} 
                      height={28}
                      className="h-[28px] w-auto" 
                    />
                  </div>
                </Link>
              </li>
              <li>
                <Link href="" className="text-white hover:text-[var(--beige)] transition-colors duration-300">
                  <div className="bg-[var(--beige)] p-1.5 rounded-full">
                    <Image 
                      src="/icon/Vector.png" 
                      alt="Social media" 
                      width={28} 
                      height={28}
                      className="h-[28px] w-auto" 
                    />
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;