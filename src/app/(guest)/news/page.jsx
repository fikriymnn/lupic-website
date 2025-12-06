"use client";
import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";
import Image from "next/image";
import CardNews from "@/components/card/CardNews";
import { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import axios from "axios";
import { motion } from "framer-motion";
import { formatTanggalIndonesia } from "@/utils/formatTanggal";

// Skeleton Component untuk Card News
const CardNewsSkeleton = () => (
  <div className="bg-white rounded-md shadow-md overflow-hidden animate-pulse w-full">
    <div className="w-full h-48 bg-gray-200" />
    <div className="p-6 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-1/3" />
      <div className="h-6 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
    </div>
  </div>
);

// Skeleton Component untuk Highlight News
const HighlightNewsSkeleton = () => (
  <div className="mt-8 w-full animate-pulse">
    <div className="md:flex m-auto w-full">
      <div className="md:w-[50%]">
        <div className="md:w-[500px] md:h-[300px] w-full h-[220px] bg-gray-200 rounded-lg" />
      </div>
      <div className="md:px-5 md:w-[50%] space-y-3 mt-3 md:mt-0">
        <div className="h-8 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
      </div>
    </div>
  </div>
);

export default function News() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data3, setData3] = useState({ judul: "", deskripsi: "", tanggal: "", _id: "", gambar: "" });
  const [data, setData] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [totalPages, setTotalPage] = useState(1);
  const [totalPagesSearch, setTotalPageSearch] = useState(1);
  const [currentPageSearch, setCurrentPageSearch] = useState(1);
  const [search, setSearch] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingHighlight, setLoadingHighlight] = useState(true);

  const onSearch = async () => {
    try {
      setLoadingSearch(true);
      const Data = await axios.get(
        process.env.NEXT_PUBLIC_API_URL +
          "/api/news?page=" +
          currentPageSearch +
          "&limit=6" +
          (search ? `&search=${search}` : "")
      );
      const Data2 = await axios.get(
        process.env.NEXT_PUBLIC_API_URL +
          "/api/news?search=" +
          search +
          "&count=asd"
      );
      if (Data.data) {
        setDataSearch(Data.data);
        setSearchActive(true);
      }
      if (Data2.data) {
        setTotalPageSearch(Math.ceil(Data2.data / 6));
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoadingSearch(false);
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        setLoadingHighlight(true);
        
        const Data = await axios.get(
          process.env.NEXT_PUBLIC_API_URL +
            "/api/news?page=" +
            currentPage +
            "&limit=9"
        );
        
        const Data2 = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/api/news"
        );
        const Data3 = await axios.get(
          process.env.NEXT_PUBLIC_API_URL +
            "/api/news?page=" +
            1 +
            "&limit=1"
        );
        
        if (Data.data) {
          setData(Data.data);
          setTotalPage(Math.ceil(Data2.data.length / 9));
        }
        
        if (Data3.data) {
          setData3(Data3.data[0]);
        }
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
        setLoadingHighlight(false);
      }
    }
    getData();
  }, [currentPage]);

  useEffect(() => {
    if (searchActive) {
      onSearch();
    }
  }, [currentPageSearch]);

  return (
    <>
      <Navbar />
      {/* hero section */}
      <main className="max-w-6xl md:px-8 px-4 m-auto pt-16">
        <div className="w-full flex justify-center mt-14 md:mb-14 mb-7">
          <div className="max-w-6xl md:px-8 px-4 m-auto bg-gradient-to-b from-koreaBlue to-black md:py-20 py-16 rounded-tl-xl rounded-br-xl rounded-tr-[100px] rounded-bl-[100px]">
            <div className="md:px-20 px-5 grid md:flex grid-cols-1 justify-items-center items-start w-full m-auto ">
              <div className="m-auto md:w-[50%] w-[90%] ">
                <h3 className=" md:text-4xl text-3xl font-bold text-white mb-3">
                  LUPIC NEWS
                </h3>
                <p className="text-white md:text-lg text-lg w-full">
                  Stay tuned for the latest updates, breakthroughs, and stories
                  from the forefront of our research endeavors.
                </p>
              </div>
              <div className="m-auto md:w-[35%] w-[90%] flex mt-5">
                <input
                  placeholder="Masukan judul..."
                  className="pl-3 w-[100%] rounded-l-lg py-2"
                  type="text"
                  name="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                />{" "}
                <button
                  className="bg-koreaRed px-3 py-2 rounded-r-lg text-white hover:bg-red-800 transition-colors duration-200"
                  onClick={onSearch}
                  disabled={loadingSearch}
                >
                  {loadingSearch ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  ) : (
                    "Cari"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search Results Section */}
        {searchActive && (
          <div>
            <div className="m-auto md:mt-8 mt-1">
              <div className="md:block md:justify-items-start grid grid-cols-1 justify-items-center mb-6">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <h1 className="md:text-4xl text-2xl font-bold">
                      Search Results
                    </h1>
                    <div className="h-1 w-36 bg-koreaRed md:mt-3 mt-2"></div>
                  </div>
                  <button
                    onClick={() => {
                      setSearchActive(false);
                      setSearch("");
                      setDataSearch([]);
                    }}
                    className="text-koreaRed hover:text-koreaRed/80 font-semibold transition-colors"
                  >
                    Clear Search
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 justify-items-center grid-cols-1 md:mt-4 mt-2 gap-6">
                {loadingSearch ? (
                  // Show skeleton loaders while searching
                  <>
                    <CardNewsSkeleton />
                    <CardNewsSkeleton />
                    <CardNewsSkeleton />
                    <CardNewsSkeleton />
                    <CardNewsSkeleton />
                    <CardNewsSkeleton />
                  </>
                ) : dataSearch.length > 0 ? (
                  dataSearch.map((v, i) => (
                    <CardNews
                      gambar={v.gambar}
                      key={i}
                      judul={v.judul}
                      deskripsi={v.deskripsi}
                      tanggal={v.tanggal}
                      id={v._id}
                    />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-20">
                    <svg
                      className="w-20 h-20 mx-auto text-gray-400 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">
                      No Results Found
                    </h3>
                    <p className="text-gray-500">
                      Try different keywords or check your spelling
                    </p>
                  </div>
                )}
              </div>
            </div>

            {!loadingSearch && dataSearch.length > 0 && (
              <div className="w-[20%] m-auto mt-10 mb-10">
                <ResponsivePagination
                  current={currentPageSearch}
                  total={totalPagesSearch}
                  onPageChange={setCurrentPageSearch}
                />
              </div>
            )}
          </div>
        )}

        {/* Latest News Section */}
        {!searchActive && (
          <>
            <div className="m-auto">
              <div className="md:block grid grid-cols-1 justify-items-center md:justify-items-start">
                <h1 className="md:text-5xl text-2xl md:mt-10 font-bold">
                  Latest News
                </h1>
                <div className="h-1 w-36 bg-koreaRed md:mt-3 mt-2"></div>
              </div>

              {/* News Highlight */}
              {loadingHighlight ? (
                <HighlightNewsSkeleton />
              ) : data3._id ? (
                <div className="mt-8 w-full">
                  <a className="md:flex m-auto w-full" href={"/news/" + data3._id}>
                    <div className="md:w-[50%]">
                      <img
                        src={process.env.NEXT_PUBLIC_API_FILE_URL + data3.gambar}
                        alt={data3.judul}
                        className="md:w-[500px] md:h-[300px] w-full h-[220px] rounded-lg object-cover hover:opacity-90 transition-opacity"
                      />
                    </div>

                    <div className="md:px-5 md:w-[50%]">
                      <h3 className="md:text-3xl mt-3 line-clamp-2 text-2xl font-bold mb-2 text-koreaBlue md:text-start hover:text-koreaBlue/80 transition-colors">
                        {data3.judul}
                      </h3>
                      <p className="text-xs mb-2 text-koreaBlueMuda md:text-start">
                        {data3.tanggal ? formatTanggalIndonesia(data3.tanggal) : ""}
                      </p>
                      <p className="text-justify md:text-lg text-sm line-clamp-6">
                        {data3.deskripsi}
                      </p>
                    </div>
                  </a>
                </div>
              ) : null}
            </div>

            {/* All News Section */}
            <div className="m-auto md:mt-8 mt-1">
              <div className="md:block md:justify-items-start grid grid-cols-1 justify-items-center">
                <h1 className="md:text-5xl text-2xl mt-10 font-bold">
                  All News
                </h1>
                <div className="h-1 w-36 bg-koreaRed md:mt-3 mt-2"></div>
              </div>

              <div className="grid md:grid-cols-3 justify-items-center grid-cols-1 md:mt-8 mt-4 gap-6">
                {loading ? (
                  // Show skeleton loaders while loading
                  <>
                    <CardNewsSkeleton />
                    <CardNewsSkeleton />
                    <CardNewsSkeleton />
                    <CardNewsSkeleton />
                    <CardNewsSkeleton />
                    <CardNewsSkeleton />
                    <CardNewsSkeleton />
                    <CardNewsSkeleton />
                    <CardNewsSkeleton />
                  </>
                ) : data.length > 0 ? (
                  data.map((v, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardNews
                        gambar={v.gambar}
                        judul={v.judul}
                        deskripsi={v.deskripsi}
                        tanggal={v.tanggal}
                        id={v._id}
                      />
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-20">
                    <svg
                      className="w-20 h-20 mx-auto text-gray-400 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      />
                    </svg>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">
                      No News Available
                    </h3>
                    <p className="text-gray-500">
                      Check back later for updates
                    </p>
                  </div>
                )}
              </div>
            </div>

            {!loading && data.length > 0 && (
              <div className="w-[20%] m-auto mt-10 mb-16">
                <ResponsivePagination
                  current={currentPage}
                  total={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </main>
      <CustomFooter />
    </>
  );
}