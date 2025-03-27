"use client";

// components/Header.tsx
import { NAV_LINKS, SOCIAL_LINKS } from '@/constants/marketing';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Logo } from './logo';
import { MobileMenu } from './mobile-menu';

const NavLinks = ({ className = '' }: { className?: string }) => (
  <ul className={`flex flex-col md:flex-row gap-4 md:gap-[50px] ${className}`}>
    {NAV_LINKS.map((link) => (
      <li key={link.label}>
        <Link 
          href={link.href} 
          className="text-[var(--marronf)] hover:text-[var(--marronc)] transition-colors duration-300"
        >
          {link.label}
        </Link>
      </li>
    ))}
  </ul>
);

const SocialLinks = ({ className }: { className?: string }) => (
  <ul className={`flex gap-4 md:gap-[25px] ${className}`}>
    {SOCIAL_LINKS.map((link) => (
      <li key={link.alt}>
        <Link 
          href={link.href} 
          className="text-[var(--marronf)] hover:text-[var(--marronc)] transition-colors duration-300"
        >
          <Image 
            src={link.icon} 
            alt={link.alt} 
            width={25} 
            height={25}
            className="h-[25px] w-auto" 
          />
        </Link>
      </li>
    ))}
  </ul>
);

const Header: React.FC = () => {
  return (
    <header className="relative p-4 md:p-[25px] flex flex-row items-center justify-between bg-[var(--beige)]">
      <Link href="/"><Logo /></Link>
      <MobileMenu />

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-[50px] items-center">
        <NavLinks />
        <SocialLinks />
      </nav>
    </header>
  );
};

export default Header;