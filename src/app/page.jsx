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

// Enhanced animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Home() {
  const [data, setData] = useState([]);

  const { ref: refGoals, inView: inViewGoals } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });
  const { ref: refActivities, inView: inViewActivities } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });
  const { ref: refNews, inView: inViewNews } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/news?page=1&limit=3`
        );
        if (res.data) setData(res.data);
      } catch (err) {
        console.error(err.message);
      }
    }
    getData();
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section with gradient overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative"
      >
        <HeroSection />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none" />
      </motion.div>

      <main className="max-w-6xl mx-auto md:px-8 px-2">
        {/* Carousel Section with modern container */}
        <section className="relative py-8 md:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-koreaBlue/10 to-koreaRed/10 rounded-3xl blur-3xl -z-10" />
              <CarouselHome />
            </motion.div>
          </div>
        </section>

        {/* Goals Section - Modern card design */}
        <section ref={refGoals} className="relative pb-8 md:pb-16 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-koreaBlue/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-koreaRed/5 rounded-full blur-3xl -z-10" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inViewGoals ? "visible" : "hidden"}
            >
              {/* Section Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 md:mb-16">
                <div className="space-y-2">
                  <span className="inline-block px-4 py-1.5 bg-koreaBlue/10 text-koreaBlue text-sm font-semibold rounded-full">
                    Our Vision
                  </span>
                  <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent py-2">
                    LUPIC Big Goals
                  </h2>
                  <p className="text-gray-600 text-base max-w-2xl">
                    Empowering excellence through innovative education partnerships
                  </p>
                </div>
                <motion.a
                  href="/activities"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center gap-2 bg-white px-6 py-3 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <span className="text-koreaBlue font-semibold">Explore More</span>
                  <svg 
                    className="w-5 h-5 text-koreaBlue group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
              </div>

              {/* Goals Image with modern styling */}
              <motion.div
                variants={scaleIn}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-koreaBlue via-purple-500 to-koreaRed rounded-3xl opacity-20 group-hover:opacity-30 blur transition-opacity" />
                <div className="relative bg-white p-14 rounded-2xl">
                  <Image
                    src="/images/goals.png"
                    alt="LUPIC Goals"
                    width={1200}
                    height={700}
                    className="rounded-xl w-full"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Activities Section - Redesigned layout */}
        <section ref={refActivities} className="relative py-8 md:py-16 from-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inViewActivities ? "visible" : "hidden"}
            >
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Left Content */}
                <div className="space-y-6">
                  <div className="inline-block">
                    <span className="px-4 py-1.5 bg-koreaBlue/10 text-koreaBlue text-sm font-semibold rounded-full">
                      Our Services
                    </span>
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Main Activities
                  </h3>
                  
                  <p className="text-gray-600 text-base leading-relaxed">
                    Lupic's main activities revolve around cutting-edge research
                    and innovation. Our dedicated team is committed to exploring
                    uncharted territories, conducting in-depth analyses, and
                    developing groundbreaking solutions.
                  </p>
                </div>

                {/* Right Content - Activity Cards */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate={inViewActivities ? "visible" : "hidden"}
                  className="space-y-6"
                >
                  {[
                    {
                      title: "Re-organization of department of partner",
                      desc: "Supporting the construction or re-organization of departments or colleges of partner universities in developing countries.",
                      icon: "",
                      color: "from-blue-500 to-cyan-500"
                    },
                    {
                      title: "Training lecturers of partner",
                      desc: "Training excellent lecturers or professors of partner universities through the Global Korea Scholarship (GKS) Program.",
                      icon: "",
                      color: "from-purple-500 to-pink-500"
                    },
                    {
                      title: "Operating programs",
                      desc: "Operating various programs to contribute to local community developments.",
                      icon: "",
                      color: "from-orange-500 to-red-500"
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="group relative"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                      <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                        <div className="flex items-start gap-4">
                          <span className="text-4xl">{item.icon}</span>
                          <div className="flex-1">
                            <h4 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-koreaBlue transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-gray-600 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* News Section - Modern grid layout */}
        <section ref={refNews} className="relative py-8 md:pb-16">
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inViewNews ? "visible" : "hidden"}
            >
              {/* Section Header */}
              <div className="text-start mb-8 space-y-4">
                <span className="inline-block px-4 py-1.5 bg-koreaBlue/10 text-koreaBlue text-sm font-semibold rounded-full">
                    Update
                  </span>
                <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                  Latest News
                </h3>
                <p className="text-gray-600 text-base max-w-2xl">
                  Discover the latest updates, achievements, and stories from LUPIC
                </p>
              </div>

              {/* News Grid */}
              <motion.div
                variants={staggerContainer}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
              >
                {data.map((v, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardNews
                      tanggal={v.tanggal}
                      judul={v.judul}
                      deskripsi={v.deskripsi}
                      gambar={v.gambar}
                      id={v._id}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <div className="flex justify-center">
                <motion.a
                  href="/news"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-koreaRed to-red-600 hover:from-koreaRed/90 hover:to-red-700 text-white font-semibold rounded-xl px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="text-sm">Read More News</span>
                  <svg 
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="w-full">
        <CustomFooter />
      </footer>
    </>
  );
}