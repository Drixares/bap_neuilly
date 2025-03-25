"use client";

import { CTAButton } from './cta-button';
import { DecorativeElements } from './decorative-elements';

interface BannerContentProps {
  title: string;
  subtitle: string;
  date: string;
}

function BannerContent({ title, subtitle, date }: BannerContentProps) {
  return (
    <div className="max-w-4xl mx-auto mb-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--marronf)]">
        {title}
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-[var(--marronf)]">
        {subtitle}
      </h2>
      <h2 className="text-2xl md:text-3xl font-semibold text-[var(--marronc)]">
        {date}
      </h2>
    </div>
  );
}

export default function Home() {
  return (
    <section id="accueil" className="bg-[var(--beige)] py-24 text-center relative">
      {/* Decorative Elements */}
      <DecorativeElements />

      {/* Main Content */}
      <BannerContent
        title="Découvrez le talent des créateurs et artisans de Neuilly-sur-Seine !"
        subtitle="avec le salon des créateurs de neuilly-sur-seine"
        date="du 29 au 3O novembre"
      />

      {/* Call to Action */}
      <div>
        <CTAButton href="#">
          inscrivez-vous dès maintenant !
        </CTAButton>
      </div>
    </section>
  );
}