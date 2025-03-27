// pages/index.tsx
import BigDiv from '@/app/(marketing)/_components/BigDiv';
import Artisans from '../_components/artisans';
import Footer from '../_components/footer';
import Header from '../_components/header';
import HomeComponent from '../_components/home';
import Images from '../_components/images';
import Info from '../_components/infos';

export default function Home() {
  return (
    <div className="font-poster">
      <Header />

      <main>
        <HomeComponent />
        <Images />
        <Info />
        <BigDiv/>
        <Artisans />
      </main>

      <Footer />
    </div>
  );
};
