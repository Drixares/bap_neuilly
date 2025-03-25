// pages/index.tsx
import Head from 'next/head';
import type { NextPage } from 'next';
import Header from '../../../components/header';
import Footer from '../../../components/footer';
import HomeComponent from '../../../components/home';
import Images from '../../../components/images';
import Info from '../../../components/infos';
import FeatureBanner from '../../../components/banner';
import Artisans from '../../../components/artisans';
import BigDiv from '@/components/BigDiv';

const Home: NextPage = () => {
  return (
    <div className="  ">
      <Head>
        <title>Neuilly</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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

export default Home;