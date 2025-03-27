// pages/index.tsx
import type { NextPage } from 'next';
import Artisans from './_components/artisans';
import FeatureBanner from './_components/banner';
import { BannerContent } from './_components/banner-content';
import { DecorativeElements } from './_components/decorative-elements';
import Footer from './_components/footer';
import Header from './_components/header';
import Images from './_components/images';
import Info from './_components/infos';

const Home: NextPage = () => {
  return (
    <div className="font-poster">
      <Header />

      <main>
          <section id="accueil" className="bg-[var(--beige)] py-24 text-center relative">
          {/* Decorative Elements */}
          <DecorativeElements />

          {/* Main Content */}
          <BannerContent
            title="Découvrez le talent des créateurs et artisans de Neuilly-sur-Seine !"
            subtitle="avec le salon des créateurs de neuilly-sur-seine"
            date="du 29 au 3O novembre"
          /> 
      </section>
        <Images />
        <Info />
        <FeatureBanner />
        <Artisans />
      </main>

      <Footer />
    </div>
  );
};

export default Home;