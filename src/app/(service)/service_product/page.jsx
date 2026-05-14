"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import CustomFooter from "@/components/CustomFooter";
import Navbar from "@/components/Navbar";
import CardServiceToko from "@/components/card/CardServiceToko";
import { motion } from "framer-motion";

const ResponsivePagination = dynamic(
  () => import("react-responsive-pagination"),
  { ssr: false }
);
import "react-responsive-pagination/themes/classic.css";

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

export default function ServiceToko() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const [resProducts, resCount] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/toko?limit=9&page=${currentPage}`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/toko?count=true`),
        ]);
        if (resProducts.data) setData(resProducts.data);
        if (resCount.data) {
          const total = resCount.data.count || resCount.data;
          setTotalPage(Math.ceil(total / 9));
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
          <section className="py-16 md:py-24">

            {/* Section Header */}
            <div className="mb-10 space-y-3">
              <span className="inline-block px-3 py-1 bg-koreaBlue/8 text-koreaBlue text-xs font-medium tracking-widest uppercase rounded-full">
                Our Products
              </span>
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight font-semibold tracking-tight">
                Our{" "}
                <em className="not-italic font-semibold">Products</em>
              </h2>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                {Array.from({ length: 9 }).map((_, i) => <CardSkeleton key={i} />)}
              </div>
            ) : data.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                {data.map((v, i) => (
                  <motion.div
                    key={v._id || i}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="w-full min-w-0"
                  >
                    <CardServiceToko
                      judul={v.judul}
                      deskripsi={v.deskripsi}
                      harga={v.harga}
                      gambar={v.gambar}
                      id={v._id}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-700 mb-1">No products found</h3>
                <p className="text-sm text-gray-400">Please check back later</p>
              </div>
            )}

            {/* Pagination */}
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