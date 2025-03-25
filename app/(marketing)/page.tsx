// pages/index.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import Artisans from './_components/artisans';
import FeatureBanner from './_components/banner';
import Footer from './_components/footer';
import Header from './_components/header';
import HomeComponent from './_components/home';
import Images from './_components/images';
import Info from './_components/infos';

const Home: NextPage = () => {
  return (
    <div className="">
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
        <FeatureBanner />
        <Artisans />
      </main>

      <Footer />
    </div>
  );
};

export default Home;