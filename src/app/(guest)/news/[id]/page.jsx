"use client"
import CustomFooter from "@/components/CustomFooter";
import Navbar from "@/components/Navbar";
import parse from "html-react-parser";
import axios from "axios";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

// Skeleton Loading Components
const HeaderSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-12 bg-gray-200 rounded-lg w-3/4 mx-auto" />
    <div className="h-4 bg-gray-200 rounded w-48 mx-auto" />
    <div className="h-4 bg-gray-200 rounded w-32 mx-auto" />
  </div>
);

const ImageSkeleton = () => (
  <div className="w-full max-w-4xl mx-auto">
    <div className="animate-pulse bg-gray-200 rounded-xl w-full h-[400px] md:h-[500px]" />
  </div>
);

const ContentSkeleton = () => (
  <div className="animate-pulse space-y-3">
    <div className="h-4 bg-gray-200 rounded w-full" />
    <div className="h-4 bg-gray-200 rounded w-full" />
    <div className="h-4 bg-gray-200 rounded w-3/4" />
  </div>
);

export default function DetailNews({ params }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = use(params);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/api/news/" + id
        );
        if (response.data) {
          setData(response.data);
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [id]);

  return (
    <>
      <Navbar />
      
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-6 md:pt-24">
        <motion.a
          href="/news"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 text-koreaRed hover:text-koreaRed/80 transition-colors group"
        >
          <svg 
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-base md:text-lg font-semibold">Back to News</span>
        </motion.a>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {loading ? (
          // Loading State
          <div className="space-y-8">
            <HeaderSkeleton />
            <ImageSkeleton />
            <div className="space-y-6">
              <ContentSkeleton />
              <ContentSkeleton />
            </div>
          </div>
        ) : data ? (
          // Content Loaded
          <motion.article
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Header Section */}
            <motion.header variants={fadeIn} className="text-center space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-koreaBlue leading-tight">
                {data.judul}
              </h1>
              
              {/* Meta Information */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm md:text-base text-gray-600">
                {data.author && (
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-medium">{data.author}</span>
                  </div>
                )}
                {data.tanggal && (
                  <div className="flex items-center gap-2 text-koreaBlueMuda">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{data.tanggal}</span>
                  </div>
                )}
              </div>
            </motion.header>

            {/* Featured Image */}
            {data.gambar && (
              <motion.div 
                variants={fadeIn}
                className="relative w-full overflow-hidden rounded-md shadow-lg"
              >
                <img
                  src={process.env.NEXT_PUBLIC_API_FILE_URL + data.gambar}
                  alt={data.judul}
                  className="w-full h-auto max-h-[500px] object-cover"
                />
              </motion.div>
            )}

            {/* Description */}
            {data.deskripsi && (
              <motion.div 
                variants={fadeIn}
                className="text-lg md:text-xl text-gray-700 leading-relaxed border-l-4 border-koreaBlue pl-6 py-2 bg-gray-50 rounded-r-lg"
              >
                {data.deskripsi}
              </motion.div>
            )}

            {/* Main Content */}
            {data.content && (
              <motion.div 
                variants={fadeIn}
                className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
              >
                {parse(data.content)}
              </motion.div>
            )}

            {/* Sub Content Sections */}
            {data.sub_content && data.sub_content.length > 0 && (
              <motion.div variants={staggerContainer} className="space-y-12 mt-12">
                {data.sub_content.map((section, index) => (
                  <motion.section
                    key={index}
                    variants={fadeIn}
                    className="space-y-6"
                  >
                    {/* Sub Title */}
                    {section.sub_judul && (
                      <div className="inline-block">
                        <h2 className="text-xl md:text-2xl font-bold text-white bg-gradient-to-r from-koreaBlueMuda to-koreaBlue px-6 py-3 rounded-lg shadow-md">
                          {section.sub_judul}
                        </h2>
                      </div>
                    )}

                    {/* Sub Content */}
                    {section.sub_content && (
                      <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
                        {parse(section.sub_content)}
                      </div>
                    )}

                    {/* Sub Images */}
                    {section.sub_gambar && section.sub_gambar.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {section.sub_gambar.map((image, imgIndex) => 
                          image && image !== "" ? (
                            <motion.div
                              key={imgIndex}
                              whileHover={{ scale: 1.02 }}
                              transition={{ duration: 0.3 }}
                              className="relative overflow-hidden rounded-md shadow-lg"
                            >
                              <img
                                src={process.env.NEXT_PUBLIC_API_FILE_URL + image}
                                alt={`${section.sub_judul || 'Image'} ${imgIndex + 1}`}
                                className="w-full h-auto object-cover"
                              />
                            </motion.div>
                          ) : null
                        )}
                      </div>
                    )}
                  </motion.section>
                ))}
              </motion.div>
            )}

            {/* Divider */}
            <motion.div 
              variants={fadeIn}
              className="border-t-2 border-gray-200 pt-8 mt-12"
            >
              <div className="flex justify-center">
                <a
                  href="/news"
                  className="inline-flex items-center gap-2 bg-koreaBlue hover:bg-koreaBlue/90 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Back to All News</span>
                </a>
              </div>
            </motion.div>
          </motion.article>
        ) : (
          // Error State
          <div className="text-center py-20">
            <svg className="w-20 h-20 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">News Not Found</h2>
            <p className="text-gray-500 mb-6">The news article you're looking for doesn't exist.</p>
            <a
              href="/news"
              className="inline-flex items-center gap-2 text-koreaBlue hover:text-koreaBlue/80 font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to News</span>
            </a>
          </div>
        )}
      </main>

      <CustomFooter />
    </>
  );
}