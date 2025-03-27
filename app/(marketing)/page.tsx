// pages/index.tsx
import type { NextPage } from 'next';
import Artisans from './_components/artisans';
import FeatureBanner from './_components/banner';
import Footer from './_components/footer';
import Header from './_components/header';
import HomeComponent from './_components/home';
import Images from './_components/images';
import Info from './_components/infos';

const Home: NextPage = () => {
  return (
    <div className="font-poster">
      <Header />

      <main>
        <HomeComponent />
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