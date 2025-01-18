import Head from 'next/head';
import Navbar from '../components/Navbar';
import Image from 'next/image';

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
              className="h-16 md:h-24"
            />
          </div>

          <h1 className="text-4xl w-[80%] md:text-6xl lg:text-6xl font-bold text-center mb-4 mx-6 md:mx-12 lg:mx-56 ">
            Leading University Project for International Cooperation
          </h1>

          <p className="text-sm w-[60%] md:text-2xl text-center mb-6 mx-4 md:mx-12">
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
          <div className='flex justify-center align-center md:pt-8'>
          <Image className="rounded-3xl" src={"/images/poster.jpg"} alt={"image"} width={1200} height={1200} />
          </div>
          {/* goals */}
          <div className='w-full md:pt-14'>
            <div className='grid grid-cols-2 w-full my-8'>
              <div className='flex justify-start align-center ml-20'>
                      <p className='text-3xl font-bold'>Lupic Big Goals</p>
              </div>
              <div className='flex justify-end align-center mr-20'> 
                        <a href='#' className='text-xl text-koreaBlue'>Read More &#8594;</a>
              </div>
            </div>
            <div className='flex justify-center'>
              <Image src={"/images/goals.png"} alt={"image"} width={1300} height={1300} />
            </div>
          </div>
          {/* activities */}
          <div className='flex w-full justify-center mt-20 '>
           <div className='grid grid-cols-2 justify-items-center align-center w-full mx-10 w-[80%] h-full '>
              <div className='content-center justify-center w-full px-8'>
                  <p className='font-bold text-xl'>Our Services</p>
                  <h3 className='text-3xl font-bold my-4'>Main Activities</h3>
                  <p className='text-base'>Lupic's main activities revolve around cutting-edge research and innovation. Our dedicated team is committed to exploring uncharted territories, conducting in-depth analyses, and developing groundbreaking solutions.</p>
                  <div className=' flex justify-end mt-8'>
                  <a href='#' className='text-lg text-koreaBlue'>Read More &#8594;</a>
                  </div>
              </div>
              <div className=''>
                <div className='shadow-md rounded-lg p-4'>
                  <h3 className='text-xl font-bold'>Re-organization of department of partner</h3>
                  <p className='text-sm mt-2'>Supporting the construction or re-organization of department/college of partner universities in developing countries</p>
                </div>
                <div className='mt-2 shadow-md rounded-lg p-4'>
                    <h3 className='text-xl font-bold'>Training lecturers of partner</h3>
                    <p className='text-sm mt-2'>Training excellent lecturers/professors of partner universities through Global Korea Scholarship (GKS) Program</p>
                </div>
                <div className='mt-2 shadow-md rounded-lg p-4'>
                    <h3 className='text-xl font-bold'>Operating programs</h3>
                    <p className='text-sm mt-2'>Operating various programs to contribute to local community developments</p>
                </div>
              </div>
             </div>
          </div>
          {/* news */}
          <div>

          </div>
      </div>
      </div>
    </>
  );
};

export default Home;
