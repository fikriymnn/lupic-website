'use client'
import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";
import { useState, useEffect } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import axios from "axios";
import CardEvent from "../../../components/card/CardEvent";
import { motion } from "framer-motion";

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

export default function Services_workshop() {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const [eventsData, totalData] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/event?page=${currentPage}&limit=9`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/event`),
        ]);
        if (eventsData.data) {
          setData(eventsData.data);
          setTotalPages(Math.ceil(totalData.data.length / 9));
        }
      } catch (err) {
        console.error("Error fetching data:", err.message);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [currentPage]);

  return (
    <>
      <Navbar />

      <main className="w-full overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">

          {/* ── Workshop Info ── */}
          <section className="pt-16 md:pt-24">
            <div className="mb-10 space-y-3">
              <span className="inline-block px-3 py-1 bg-koreaBlue/8 text-koreaBlue text-xs font-medium tracking-widest uppercase rounded-full">
                Services
              </span>
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight font-semibold tracking-tight">
                Our{" "}
                <em className="not-italic font-semibold">Workshop</em>
              </h2>
            </div>

            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
              <p className="text-justify">
                The Leading University Project for International Cooperation (LUPIC)
                regularly organizes various workshops aimed at enhancing the quality
                of education, particularly in the fields of chemistry and Science,
                Technology, Engineering, and Mathematics (STEM).
              </p>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-gray-900">
                  1. Workshop Fabrication Laboratory Education (Fablab Edu)
                </h3>
                <p className="text-justify">
                  Fablab Edu is a laboratory facility supported by LUPIC to enhance
                  technology-based learning in the fields of chemistry and STEM.
                </p>
                <p className="text-justify">
                  The fablab workshop will run for 32JP through onsite and online
                  meeting. The figure and table below showed the flow of the meeting
                  and detail program.
                </p>
              </div>
            </div>
          </section>

          {/* ── Event Workshop ── */}
          <section className="py-16 md:py-24">
            <div className="mb-10 space-y-3">
              <span className="inline-block px-3 py-1 bg-koreaBlue/8 text-koreaBlue text-xs font-medium tracking-widest uppercase rounded-full">
                Events
              </span>
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight font-semibold tracking-tight">
                Event{" "}
                <em className="not-italic font-semibold">Workshop</em>
              </h2>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                {Array.from({ length: 9 }).map((_, i) => <CardSkeleton key={i} />)}
              </div>
            ) : data.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                {data.map((event, i) => (
                  <motion.div
                    key={event._id}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="w-full min-w-0"
                  >
                    <CardEvent
                      gambar={event.gambar}
                      judul={event.judul}
                      waktu={event.waktu}
                      jam={event.jam}
                      lokasi={event.lokasi}
                      harga={event.harga}
                      id={event._id}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-700 mb-1">No workshops available</h3>
                <p className="text-sm text-gray-400">Please check back later</p>
              </div>
            )}

            {!loading && totalPages > 1 && (
              <div className="flex justify-center mt-10">
                <div className="w-full max-w-xs">
                  <ResponsivePagination
                    current={currentPage}
                    total={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </div>
            )}
          </section>

        </div>
      </main>

      <CustomFooter />
    </>
  );
}