import { cn } from '@/lib/utils';
import Link from 'next/link';

interface CTAButtonProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export function CTAButton({ href, className, children }: CTAButtonProps) {
  return (
    <Link 
      href={href} 
      className={cn(
        "inline-block bg-[var(--marronc)] hover:bg-[var(--marronf)] text-white font-bold py-3 px-8 rounded-xl tracking-wide transition-colors",
        className
      )}
    >
      {children}
    </Link>
  );
} 