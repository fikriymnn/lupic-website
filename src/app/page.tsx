import Head from 'next/head';
import Navbar from '../components/Navbar';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>LPIC Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar />
      <div
        className="relative bg-cover bg-center h-screen text-white flex flex-col justify-center items-center px-4 md:px-6"
        style={{ backgroundImage: "url('/images/villa-isola.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-koreaBlue to-black opacity-50 z-0"></div>

        <div className="relative z-10 flex flex-col justify-center items-center">
          <button className="bg-koreaBlue py-2 px-4 md:px-6 rounded-full text-xs md:text-sm mb-4 hover:bg-red-600">
            In Collaboration With Great Univ
          </button>

          <div className="space-x-4 mb-6">
            <img
              src="/images/logo-instansi-home.png"
              alt="Logo-logo instansi"
              className="h-16 md:h-24"
            />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 mx-6 md:mx-12 lg:mx-56">
            Leading University Project for International Cooperation
          </h1>

          <p className="text-sm md:text-lg text-center mb-6 mx-4 md:mx-12">
            Improving Chemistry/Science Education Program in Java and Northern Bali Islands and
            Community Service
          </p>

          <button className="bg-white text-red-700 py-2 px-4 md:px-6 rounded-lg hover:bg-red-700 hover:text-white">
            Read More
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
