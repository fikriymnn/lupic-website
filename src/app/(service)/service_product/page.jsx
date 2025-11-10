"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import CustomFooter from "@/components/CustomFooter";
import Navbar from "@/components/Navbar";
import CardServiceToko from "@/components/card/CardServiceToko";

// Import pagination secara dinamis
const ResponsivePagination = dynamic(
  () => import("react-responsive-pagination"),
  { ssr: false }
);
import "react-responsive-pagination/themes/classic.css";

export default function ServiceToko() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPage] = useState(1);

  useEffect(() => {
    async function getData() {
      try {
        // Fetch data produk per halaman
        const resProducts = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/toko?limit=8&page=${currentPage}`
        );

        // Fetch total count produk untuk hitung total halaman
        const resCount = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/toko?count=true`
        );

        if (resProducts.data) setData(resProducts.data);
        if (resCount.data) {
          const total = resCount.data.count || resCount.data;
          setTotalPage(Math.ceil(total / 8)); // 9 item per halaman
        }
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    }

    getData();
  }, [currentPage]);

  return (
    <>
      <Navbar />

     {/* Title */}
        <div className="max-w-6xl mx-auto md:block grid grid-cols-1 justify-items-center md:justify-items-start md:pt-16 pt-24 mb-8">
          <h1 className="md:text-5xl text-4xl md:mt-10 font-bold">
            Our Products
          </h1>
          <div className="h-1 w-36 bg-koreaRed md:mt-3 mt-2"></div>
        </div>

      {/* Grid Card Produk */}
      <section className="max-w-6xl w-full mx-auto px-4 mb-16 grid justify-items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center justify-items-center">
        {data.length > 0 ? (
          data.map((v, i) => (
            <CardServiceToko
              key={v._id || i}
              judul={v.judul}
              deskripsi={v.deskripsi}
              harga={v.harga}
              gambar={v.gambar}
              id={v._id}
            />
          ))
        ) : (
          <p className="col-span-full text-gray-500 text-center">
            Loading products...
          </p>
        )}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mb-16">
          <ResponsivePagination
            current={currentPage}
            total={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      <CustomFooter />
    </>
  );
}
