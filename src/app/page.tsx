import Head from 'next/head';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import CardNews from '@/components/card/CardNews';
import CustomFooter from '@/components/CustomFooter';
import CarouselHome from '@/components/carousel/CarouselHome';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>LPIC Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar />
      {/* hero section */}
      <div
        className="relative bg-cover bg-center h-screen text-white flex flex-col justify-center items-center px-4 md:px-6"
        style={{ backgroundImage: "url('/images/villa-isola.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-koreaBlue to-black opacity-50 z-0"></div>

        <div className="relative z-10 flex flex-col justify-center items-center">
          <button className="bg-koreaBlue py-3 px-4 md:px-8 rounded-full text-xs font-bold md:text-sm mb-4 hover:bg-red-600">
            In Collaboration With Great Univ
          </button>

          <div className="space-x-4 mb-6">
            <img
              src="/images/logo-instansi-home.png"
              alt="Logo-logo instansi"
              className="h-8 md:h-24"
            />
          </div>

          <h1 className="text-3xl w-[80%] md:text-6xl lg:text-6xl font-bold text-center mb-4 mx-6 md:mx-12 lg:mx-56 ">
            Leading University Project for International Cooperation
          </h1>

          <p className="text-sm md:w-[60%] w-[80%] md:text-2xl text-center mb-6 mx-4 md:mx-12">
            Improving Chemistry/Science Education Program in Java and Northern Bali Islands and
            Community Service
          </p>

          <button className="bg-white text-red-700 py-2 px-4 md:px-6 rounded-lg hover:bg-red-700 hover:text-white">
            Read More
          </button>
        </div>
      </div>
      <div className='flex justify-center'>
      <div className="w-[95%]">
          {/* poster */}
          <div className='flex justify-center align-center md:pt-8 pt-5'>
          <CarouselHome/>
          </div>
          {/* goals */}
          <div className='w-full md:pt-14 pt-8'>
            <div className='grid md:grid-cols-2 justify-items-between grid-cols-1 w-full my-10 '>
              <div className='flex md:justify-start justify-center align-center md:ml-16'>
                      <p className='md:text-3xl text-xl font-bold'>Lupic Big Goals</p>
              </div>
              <div className='flex md:justify-end justify-center align-center md:mr-16 md:mt-0 mt-2'> 
                        <a href='#' className='md:text-xl text-base text-koreaBlue'>Read More &#8594;</a>
              </div>
            </div>
            <div className='flex justify-center'>
              <Image src={"/images/goals.png"} alt={"image"} width={1300} height={1300} />
            </div>
          </div>
          {/* activities */}
          <div className='flex w-full justify-center mt-20 '>
           <div className='grid md:grid-cols-2 grid-cols-1 justify-items-center align-center w-full mx-10 md:w-[90%] w-[90%] h-full '>
              <div className='content-center justify-center w-full md:px-8 px-1'>
                  <p className='font-bold text-xl'>Our Services</p>
                  <h3 className='text-3xl font-bold my-4'>Main Activities</h3>
                  <p className='text-base'>Lupic's main activities revolve around cutting-edge research and innovation. Our dedicated team is committed to exploring uncharted territories, conducting in-depth analyses, and developing groundbreaking solutions.</p>
                  <div className=' flex justify-end md:mt-8 md:mb-3 mb-8 mt-5'>
                  <a href='#' className='md:text-lg text-sm text-koreaBlue'>Read More &#8594;</a>
                  </div>
              </div>
              <div>
                <div className='shadow-md rounded-lg p-5'>
                  <h3 className='text-xl font-bold'>Re-organization of department of partner</h3>
                  <p className='text-sm mt-2'>Supporting the construction or re-organization of department/college of partner universities in developing countries</p>
                </div>
                <div className='mt-2 shadow-md rounded-lg p-5'>
                    <h3 className='text-xl font-bold'>Training lecturers of partner</h3>
                    <p className='text-sm mt-2'>Training excellent lecturers/professors of partner universities through Global Korea Scholarship (GKS) Program</p>
                </div>
                <div className='mt-2 shadow-md rounded-lg p-5'>
                    <h3 className='text-xl font-bold'>Operating programs</h3>
                    <p className='text-sm mt-2'>Operating various programs to contribute to local community developments</p>
                </div>
              </div>
             </div>
          </div>
          {/* news */}
          <div className='md:mt-20 mt-10'>
            <h3 className='text-center text-4xl font-bold'>Latest News</h3>
            <div className='flex md:flex-nowrap flex-wrap justify-center mt-8'>
              <CardNews/>
              <CardNews/>
              <CardNews/>
            </div>
            <a href='#' className='bg-koreaRed md:w-56 md:h-16 w-36 h-14 flex justify-center align-center content-middle rounded-xl md:mt-10 mt-8 m-auto'>
              <p className='m-auto text-white md:text-base text-xs'>Read More News &#8594;</p>
            </a>
          </div>
      </div>
      </div>
      {/* footer */}
      <footer className='md:mt-20 mt-10 w-full'>
      <CustomFooter/>
      </footer>
      
    </>
  );
};

export default Home;
