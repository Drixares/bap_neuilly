// pages/index.tsx
import BigDiv from '@/app/(marketing)/_components/BigDiv';
import Artisans from '../_components/artisans';
import { BannerContent } from '../_components/banner-content';
import { DecorativeElements } from '../_components/decorative-elements';
import Footer from '../_components/footer';
import Header from '../_components/header';
import Images from '../_components/images';
import Info from '../_components/infos';

export default function Home() {
  return (
    <div className="font-poster">
      <Header />

      <main>
        <section id="accueil" className="bg-[var(--beige)] py-24 text-center relative">
        {/* Decorative Elements */}
          <DecorativeElements />

          {/* Main Content */}
          <BannerContent
            title="Rencontrez des milliers de visiteurs et développez votre visibilité."
            subtitle="avec le salon des créateurs de neuilly-sur-seine"
            date="du 29 au 3O novembre"
          /> 
      </section>
        <Images />
        <Info />
        <BigDiv/>
        <Artisans />
      </main>

      <Footer />
    </div>
  );
};
