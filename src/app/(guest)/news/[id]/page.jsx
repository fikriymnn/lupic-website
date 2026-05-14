"use client"
import CustomFooter from "@/components/CustomFooter";
import Navbar from "@/components/Navbar";
import parse from "html-react-parser";
import axios from "axios";
import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatTanggalIndonesia } from "@/utils/formatTanggal";

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
    transition: { staggerChildren: 0.15 }
  }
};

// ─── Skeletons ────────────────────────────────────────────────────────────────

const HeaderSkeleton = () => (
  <div className="animate-pulse space-y-3">
    <div className="h-10 bg-gray-200 rounded-lg w-3/4 mx-auto" />
    <div className="h-4 bg-gray-200 rounded w-40 mx-auto" />
    <div className="h-4 bg-gray-200 rounded w-28 mx-auto" />
  </div>
);

const ImageSkeleton = () => (
  <div className="animate-pulse bg-gray-200 rounded-xl w-full h-[300px] md:h-[480px]" />
);

const ContentSkeleton = () => (
  <div className="animate-pulse space-y-3">
    <div className="h-4 bg-gray-200 rounded w-full" />
    <div className="h-4 bg-gray-200 rounded w-full" />
    <div className="h-4 bg-gray-200 rounded w-3/4" />
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DetailNews({ params }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = use(params);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/news/${id}`
        );
        if (response.data) setData(response.data);
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

      <main className="w-full overflow-x-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-20 pb-16">

          {/* Back Button */}
          <motion.a
            href="/news"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 text-sm font-medium text-koreaRed hover:text-koreaRed/70 transition-colors group mb-10"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to News</span>
          </motion.a>

          {loading ? (
            <div className="space-y-8">
              <HeaderSkeleton />
              <ImageSkeleton />
              <ContentSkeleton />
              <ContentSkeleton />
            </div>

          ) : data ? (
            <motion.article
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Header */}
              <motion.header variants={fadeIn} className="space-y-3 text-center">
                <h1 className="text-2xl md:text-4xl font-bold text-koreaBlue leading-snug">
                  {data.judul}
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm text-gray-500">
                  {data.author && (
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="font-medium text-gray-700">{data.author}</span>
                    </div>
                  )}
                  {data.tanggal && (
                    <div className="flex items-center gap-1.5 text-koreaBlueMuda">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{formatTanggalIndonesia(data.tanggal)}</span>
                    </div>
                  )}
                </div>
              </motion.header>

              {/* Featured Image */}
              {data.gambar && (
                <motion.div
                  variants={fadeIn}
                  className="w-full overflow-hidden rounded-xl shadow-md"
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_FILE_URL}${data.gambar}`}
                    alt={data.judul}
                    className="w-full h-[300px] md:h-[480px] object-cover"
                  />
                </motion.div>
              )}

              {/* Description */}
              {data.deskripsi && (
                <motion.div
                  variants={fadeIn}
                  className="text-sm md:text-base text-gray-700 leading-relaxed border-l-4 border-koreaBlue pl-5 py-2 bg-gray-50 rounded-r-lg"
                >
                  {data.deskripsi}
                </motion.div>
              )}

              {/* Main Content */}
              {data.content && (
                <motion.div
                  variants={fadeIn}
                  className="prose prose-sm md:prose-base max-w-none text-gray-800 leading-relaxed"
                >
                  {parse(data.content)}
                </motion.div>
              )}

              {/* Sub Content */}
              {data.sub_content && data.sub_content.length > 0 && (
                <motion.div variants={staggerContainer} className="space-y-10">
                  {data.sub_content.map((section, index) => (
                    <motion.section key={index} variants={fadeIn} className="space-y-4">

                      {section.sub_judul && (
                        <h2 className="inline-block text-base md:text-xl font-bold text-white bg-gradient-to-r from-koreaBlueMuda to-koreaBlue px-5 py-2.5 rounded-lg shadow-sm">
                          {section.sub_judul}
                        </h2>
                      )}

                      {section.sub_content && (
                        <div className="prose prose-sm md:prose-base max-w-none text-gray-800 leading-relaxed">
                          {parse(section.sub_content)}
                        </div>
                      )}

                      {section.sub_gambar && section.sub_gambar.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                          {section.sub_gambar.map((image, imgIndex) =>
                            image && image !== "" ? (
                              <motion.div
                                key={imgIndex}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden rounded-lg shadow-md"
                              >
                                <img
                                  src={`${process.env.NEXT_PUBLIC_API_FILE_URL}${image}`}
                                  alt={`${section.sub_judul || "Image"} ${imgIndex + 1}`}
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

              {/* Footer CTA */}
              <motion.div
                variants={fadeIn}
                className="border-t border-gray-200 pt-8 flex justify-center"
              >
                
                <a  href="/news"
                  className="inline-flex items-center gap-2 bg-koreaBlue hover:bg-koreaBlue/90 text-white text-sm font-medium px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Back to All News</span>
                </a>
              </motion.div>
            </motion.article>

          ) : (
            // Error State
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-xl font-bold text-gray-700 mb-2">Berita Tidak Ditemukan</h2>
              <p className="text-sm text-gray-400 mb-6">Artikel yang kamu cari tidak tersedia.</p>
              
              <a  href="/news"
                className="inline-flex items-center gap-2 text-sm font-medium text-koreaBlue hover:text-koreaBlue/70 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Kembali ke News</span>
              </a>
            </div>
          )}

        </div>
      </main>

      <CustomFooter />
    </>
  );
}