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

const NewsCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-gray-200" />
    <div className="p-6 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-1/3" />
      <div className="h-6 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
    </div>
  </div>
);

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { ref: refGoals, inView: inViewGoals } = useInView({
    triggerOnce: true,
    threshold: 0.30,
  });
  const { ref: refActivities, inView: inViewActivities } = useInView({
    triggerOnce: true,
    threshold: 0.30,
  });
  const { ref: refNews, inView: inViewNews } = useInView({
    triggerOnce: true,
    threshold: 0.30,
  });

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/news?page=1&limit=3`
        );
        if (res.data) setData(res.data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative"
      >
        <HeroSection />
      </motion.div>

      <main className="w-full overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">

          {/* Carousel Section */}
          <section className="py-16 md:py-24">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <CarouselHome />
            </motion.div>
          </section>

          {/* Goals Section */}
          <section ref={refGoals} className="py-16 md:py-24">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inViewGoals ? "visible" : "hidden"}
            >
              {/* Section Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                <div className="space-y-3">
                  <span className="inline-block px-3 py-1 bg-koreaBlue/8 text-koreaBlue text-xs font-medium tracking-widest uppercase rounded-full">
                    Our Vision
                  </span>
                  <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight font-semibold tracking-tight">
                    LUPIC{" "}
                    <em className="not-italic font-semibold">Big Goals</em>
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-md">
                    Empowering excellence through innovative education partnerships
                  </p>
                </div>
                <motion.a
                  href="/activities"
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center gap-2 text-sm text-koreaBlue font-medium border border-koreaBlue/30 px-5 py-2.5 rounded-lg hover:bg-koreaBlue/5 transition-all duration-200 whitespace-nowrap"
                >
                  <span>Explore More</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
              </div>

              {/* Goals Image */}
              <motion.div variants={scaleIn}>
                <div className="py-8 px-4 md:p-14 rounded-xl bg-white shadow-sm border border-gray-100">
                  <Image
                    src="/images/goals.png"
                    alt="LUPIC Goals"
                    width={1200}
                    height={700}
                    className="rounded-lg w-full h-auto"
                  />
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* Activities Section */}
          <section ref={refActivities} className="py-16 md:py-24">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inViewActivities ? "visible" : "hidden"}
            >
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                {/* Left Content */}
                <div className="space-y-4">
                  <span className="inline-block px-3 py-1 bg-koreaBlue/8 text-koreaBlue text-xs font-medium tracking-widest uppercase rounded-full">
                    Our Services
                  </span>
                  <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight font-semibold tracking-tight">
                    Main{" "}
                    <em className="not-italic font-semibold">Activities</em>
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed">
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
                  className="space-y-4"
                >
                  {[
                    {
                      title: "Re-organization of department of partner",
                      desc: "Supporting the construction or re-organization of departments or colleges of partner universities in developing countries.",
                      color: "from-blue-500 to-cyan-500",
                    },
                    {
                      title: "Training lecturers of partner",
                      desc: "Training excellent lecturers or professors of partner universities through the Global Korea Scholarship (GKS) Program.",
                      color: "from-purple-500 to-pink-500",
                    },
                    {
                      title: "Operating programs",
                      desc: "Operating various programs to contribute to local community developments.",
                      color: "from-orange-500 to-red-500",
                    },
                  ].map((item, i) => (
                    <motion.div key={i} variants={fadeUp} className="group relative">
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`} />
                      <div className="relative bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                        <div className="flex items-start gap-4">
                          <div className="flex-1">
                            <h4 className="text-base font-semibold mb-2 text-gray-900 group-hover:text-koreaBlue transition-colors leading-snug">
                              {item.title}
                            </h4>
                            <p className="text-gray-500 text-sm leading-relaxed">
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
          </section>

          {/* News Section */}
          <section ref={refNews} className="py-16 md:py-24 overflow-hidden">
            {/* ✅ overflow-hidden mencegah konten melebihi batas section */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inViewNews ? "visible" : "hidden"}
            >
              {/* Section Header */}
              <div className="mb-10 space-y-3">
                <span className="inline-block px-3 py-1 bg-koreaBlue/8 text-koreaBlue text-xs font-medium tracking-widest uppercase rounded-full">
                  Update
                </span>
                <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight font-semibold tracking-tight">
                  Latest{" "}
                  <em className="not-italic font-semibold">News</em>
                </h2>
                <p className="text-gray-500 text-sm max-w-md leading-relaxed">
                  Discover the latest updates, achievements, and stories from LUPIC
                </p>
              </div>

              {/* News Grid */}
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10 w-full"
              // ✅ Tambah grid-cols-1 untuk mobile + w-full
              >
                {loading ? (
                  <>
                    <NewsCardSkeleton />
                    <NewsCardSkeleton />
                    <NewsCardSkeleton />
                  </>
                ) : (
                  data.map((v, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="w-full min-w-0"
                    // ✅ min-w-0 mencegah flex/grid item overflow
                    >
                      <CardNews
                        tanggal={v.tanggal}
                        judul={v.judul}
                        deskripsi={v.deskripsi}
                        gambar={v.gambar}
                        id={v._id}
                      />
                    </motion.div>
                  ))
                )}
              </motion.div>

              {/* CTA Button */}
              <div className="flex justify-center">
                <motion.a
                  href="/news"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="group inline-flex items-center gap-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-xl px-7 py-3.5 transition-all duration-200"
                >
                  <span>Read More News</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </section>

        </div>
      </main>

      <footer className="w-full">
        <CustomFooter />
      </footer>
    </>
  );
}