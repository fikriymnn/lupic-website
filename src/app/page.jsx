"use client";
import Head from "next/head";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Navbar from "../components/Navbar";
import Image from "next/image";
import CardNews from "@/components/card/CardNews";
import CustomFooter from "@/components/CustomFooter";
import CarouselHome from "@/components/carousel/CarouselHome";
import HeroSection from "@/components/HeroSection";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const { ref: refGoals, inView: inViewGoals } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });
  const { ref: refActivities, inView: inViewActivities } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });
  const { ref: refNews, inView: inViewNews } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  useEffect(() => {
    async function getData() {
      try {
        const Data = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/api/news?page=1&limit=3"
        );
        if (Data.data) {
          setData(Data.data);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    getData();
  }, []);

  return (
    <>
      <Head>
        <title>LPIC Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <HeroSection />
      </motion.div>

      <div className="flex justify-center">
        <div className="w-[95%]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center align-center md:pt-8 pt-5">
              <CarouselHome />
            </div>
          </motion.div>

          <motion.div
            ref={refGoals}
            initial={{ opacity: 0, y: 30 }}
            animate={inViewGoals ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="w-full md:pt-14 pt-8">
              <div className="grid md:grid-cols-2 justify-items-between grid-cols-1 w-full my-10">
                <div className="flex md:justify-start justify-center align-center md:ml-16">
                  <p className="md:text-3xl text-xl font-bold">
                    LUPIC Big Goals
                  </p>
                </div>
                <div className="flex md:justify-end justify-center align-center md:mr-16 md:mt-0 mt-2">
                  <a
                    href="/activities"
                    className="md:text-xl text-base text-koreaBlue"
                  >
                    Read More &#8594;
                  </a>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src={"/images/goals.png"}
                  alt="image"
                  width={1300}
                  height={1300}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            ref={refActivities}
            initial={{ opacity: 0, y: 40 }}
            animate={inViewActivities ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex w-full justify-center mt-20">
              <div className="grid md:grid-cols-2 grid-cols-1 justify-items-center align-center w-full mx-10 md:w-[90%] w-[90%] h-full">
                <div className="content-center justify-center w-full md:px-8 px-1">
                  <p className="font-bold text-xl">Our Services</p>
                  <h3 className="text-3xl font-bold my-4">Main Activities</h3>
                  <p className="text-base">
                    Lupic's main activities revolve around cutting-edge research
                    and innovation. Our dedicated team is committed to exploring
                    uncharted territories, conducting in-depth analyses, and
                    developing groundbreaking solutions.
                  </p>
                  <div className="flex justify-end md:mt-8 md:mb-3 mb-8 mt-5">
                    <a href="#" className="md:text-lg text-sm text-koreaBlue">
                      Read More &#8594;
                    </a>
                  </div>
                </div>
                <div>
                  <div className="shadow-md rounded-lg p-5">
                    <h3 className="text-xl font-bold">
                      Re-organization of department of partner
                    </h3>
                    <p className="text-sm mt-2">
                      Supporting the construction or re-organization of
                      department/college of partner universities in developing
                      countries
                    </p>
                  </div>
                  <div className="mt-2 shadow-md rounded-lg p-5">
                    <h3 className="text-xl font-bold">
                      Training lecturers of partner
                    </h3>
                    <p className="text-sm mt-2">
                      Training excellent lecturers/professors of partner
                      universities through Global Korea Scholarship (GKS)
                      Program
                    </p>
                  </div>
                  <div className="mt-2 shadow-md rounded-lg p-5">
                    <h3 className="text-xl font-bold">Operating programs</h3>
                    <p className="text-sm mt-2">
                      Operating various programs to contribute to local
                      community developments
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            ref={refNews}
            initial={{ opacity: 0, y: 50 }}
            animate={inViewNews ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="md:mt-20 mt-10">
              <h3 className="text-center text-4xl font-bold">Latest News</h3>
              <div className="grid md:grid-cols-3 grid-cols-1 w-[90%] m-auto justify-items-center mt-8">
                {data &&
                  data.map((v, i) => {
                    return (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="mx-5"
                      >
                        <CardNews
                          tanggal={v.tanggal}
                          judul={v.judul}
                          deskripsi={v.deskripsi}
                          gambar={v.gambar}
                          id={v._id}
                        />
                      </motion.div>
                    );
                  })}
              </div>
              <a
                href="/news"
                className="bg-koreaRed md:w-56 md:h-16 w-36 h-14 flex justify-center align-center content-middle rounded-xl md:mt-10 mt-8 m-auto"
              >
                <p className="m-auto text-white md:text-base text-xs">
                  Read More News &#8594;
                </p>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="md:mt-20 mt-10 w-full">
        <CustomFooter />
      </footer>
    </>
  );
};

export default Home;
