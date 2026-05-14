"use client"
import CustomFooter from "@/components/CustomFooter";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { use, useEffect, useState } from "react";
import parse from "html-react-parser";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

// ─── Skeletons ────────────────────────────────────────────────────────────────

const HeaderSkeleton = () => (
  <div className="animate-pulse space-y-3">
    <div className="h-10 bg-gray-200 rounded-lg w-2/3 mx-auto" />
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

export default function DetailFacility({ params }) {
  const { id } = use(params);
  const [data, setData] = useState({ judul: "", deskripsi: "", content: "", gambar: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const Data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/facility/${id}`);
        if (Data.data) setData(Data.data);
      } catch (err) {
        console.log(err.message);
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
            href="/facilities"
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
            <span>Back to Facilities</span>
          </motion.a>

          {loading ? (
            <div className="space-y-8">
              <HeaderSkeleton />
              <ImageSkeleton />
              <ContentSkeleton />
              <ContentSkeleton />
            </div>
          ) : (
            <motion.article
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Header */}
              <motion.header variants={fadeIn} className="text-center space-y-3">
                <h1 className="text-2xl md:text-4xl font-bold text-koreaBlue leading-snug">
                  {data.judul}
                </h1>
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

              {/* Footer CTA */}
              {/* <motion.div
                variants={fadeIn}
                className="border-t border-gray-200 pt-8 flex justify-center"
              >
                
                <a  href="/facilities"
                  className="inline-flex items-center gap-2 bg-koreaBlue hover:bg-koreaBlue/90 text-white text-sm font-medium px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Back to All Facilities</span>
                </a>
              </motion.div> */}
            </motion.article>
          )}

        </div>
      </main>

      <CustomFooter />
    </>
  );
}