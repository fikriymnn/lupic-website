"use client";
import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";
import CardFacilities from "@/components/card/CardFacilities";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: "easeOut" },
  }),
};

const CardSkeleton = () => (
  <div className="w-full bg-gray-50 p-2 rounded-md overflow-hidden animate-pulse">
    <div className="w-full aspect-[16/9] bg-gray-200 rounded-t-md" />
    <div className="py-4 h-[120px] space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  </div>
);

export default function Facilities() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/facility`
        );
        if (response.data) setData(response.data);
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

      <main className="w-full overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          <section className="py-16 md:py-24">

            {/* Section Header */}
            <div className="mb-10 space-y-3">
              <span className="inline-block px-3 py-1 bg-koreaBlue/8 text-koreaBlue text-xs font-medium tracking-widest uppercase rounded-full">
                Our Facilities
              </span>
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight font-semibold tracking-tight">
                Our{" "}
                <em className="not-italic font-semibold">Facilities</em>
              </h2>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
              </div>
            ) : data.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                {data.map((facility, i) => (
                  <motion.div
                    key={facility._id}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="w-full min-w-0"
                  >
                    <CardFacilities
                      judul={facility.judul}
                      deskripsi={facility.deskripsi}
                      gambar={facility.gambar}
                      id={facility._id}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-700 mb-1">No facilities found</h3>
                <p className="text-sm text-gray-400">Please check back later</p>
              </div>
            )}

          </section>
        </div>
      </main>

      <CustomFooter />
    </>
  );
}