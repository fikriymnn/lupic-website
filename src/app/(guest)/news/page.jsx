"use client";
import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";
import CardNews from "@/components/card/CardNews";
import { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import axios from "axios";
import { motion } from "framer-motion";
import { formatTanggalIndonesia } from "@/utils/formatTanggal";

// ─── Skeletons ────────────────────────────────────────────────────────────────

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

const HighlightNewsSkeleton = () => (
  <div className="mt-8 w-full animate-pulse">
    <div className="flex flex-col md:flex-row gap-6 w-full">
      <div className="w-full md:w-1/2">
        <div className="w-full h-[220px] md:h-[300px] bg-gray-200 rounded-lg" />
      </div>
      <div className="w-full md:w-1/2 space-y-3">
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

// ─── Section Header ───────────────────────────────────────────────────────────

const SectionHeader = ({ title, onClear }) => (
  <div className="flex items-end justify-between w-full mb-6">
    <div className="space-y-2">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
      <div className="h-1 w-12 bg-koreaRed rounded-full" />
    </div>
    {onClear && (
      <button
        onClick={onClear}
        className="text-sm text-koreaRed hover:text-koreaRed/70 font-medium transition-colors"
      >
        Clear Search
      </button>
    )}
  </div>
);

// ─── News Grid ────────────────────────────────────────────────────────────────

const NewsGrid = ({ items, loading, skeletonCount = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
    {loading
      ? Array.from({ length: skeletonCount }).map((_, i) => (
        <CardNewsSkeleton key={i} />
      ))
      : items.map((v, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.25 }}
          className="w-full min-w-0"
        >
          <CardNews
            gambar={v.gambar}
            judul={v.judul}
            deskripsi={v.deskripsi}
            tanggal={v.tanggal}
            id={v._id}
          />
        </motion.div>
      ))}
  </div>
);

// ─── Empty State ──────────────────────────────────────────────────────────────

const EmptyState = ({ message = "Tidak ada berita tersedia", sub = "Coba lagi nanti" }) => (
  <div className="col-span-3 flex flex-col items-center justify-center py-20 text-center">
    <svg
      className="w-16 h-16 text-gray-300 mb-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
      />
    </svg>
    <h3 className="text-lg font-semibold text-gray-700 mb-1">{message}</h3>
    <p className="text-sm text-gray-400">{sub}</p>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

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
      const [Data, Data2] = await Promise.all([
        axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/news?page=${currentPageSearch}&limit=6${search ? `&search=${search}` : ""}`
        ),
        axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/news?search=${search}&count=asd`
        ),
      ]);
      if (Data.data) { setDataSearch(Data.data); setSearchActive(true); }
      if (Data2.data) setTotalPageSearch(Math.ceil(Data2.data / 6));
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
        const [Data, Data2, Data3] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/news?page=${currentPage}&limit=${currentPage === 1 ? 10 : 9}`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/news`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/news?page=1&limit=1`),
        ]);
        if (Data.data) { setData(Data.data); setTotalPage(Math.ceil((Data2.data.length - 1) / 9)); }
        if (Data3.data) setData3(Data3.data[0]);
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
    if (searchActive) onSearch();
  }, [currentPageSearch]);

  return (
    <>
      <Navbar />

      <main className="w-full overflow-x-hidden">
        {/* ── Hero ── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-20 mt-6 mb-10 md:mb-14">
          <div className="w-full bg-gradient-to-b from-koreaBlue to-black py-14 md:py-20 px-6 md:px-16 rounded-tl-xl rounded-br-xl rounded-tr-[80px] rounded-bl-[80px]">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              {/* Title */}
              <div className="flex-1 space-y-3">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  LUPIC NEWS
                </h1>
                <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-sm">
                  Stay tuned for the latest updates, breakthroughs, and stories
                  from the forefront of our research endeavors.
                </p>
              </div>
              {/* Search */}
              <div className="w-full md:w-auto md:min-w-[300px] flex">
                <input
                  placeholder="Cari judul berita..."
                  className="pl-4 w-full rounded-l-lg py-2.5 text-sm focus:outline-none"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && onSearch()}
                />
                <button
                  className="bg-koreaRed px-4 py-2.5 rounded-r-lg text-white text-sm font-medium hover:bg-red-800 transition-colors duration-200 whitespace-nowrap"
                  onClick={onSearch}
                  disabled={loadingSearch}
                >
                  {loadingSearch ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : "Cari"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pb-16 space-y-16">

          {/* ── Search Results ── */}
          {searchActive && (
            <section>
              <SectionHeader
                title="Search Results"
                onClear={() => { setSearchActive(false); setSearch(""); setDataSearch([]); }}
              />
              {!loadingSearch && dataSearch.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-700 mb-1">Tidak ada hasil</h3>
                  <p className="text-sm text-gray-400">Coba kata kunci yang berbeda</p>
                </div>
              ) : (
                <NewsGrid items={dataSearch} loading={loadingSearch} skeletonCount={6} />
              )}
              {!loadingSearch && dataSearch.length > 0 && (
                <div className="flex justify-center mt-10">
                  <div className="w-full max-w-xs">
                    <ResponsivePagination
                      current={currentPageSearch}
                      total={totalPagesSearch}
                      onPageChange={setCurrentPageSearch}
                    />
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ── Latest & All News ── */}
          {!searchActive && (
            <>
              {/* Latest / Highlight */}
              <section>
                <SectionHeader title="Latest News" />
                {loadingHighlight ? (
                  <HighlightNewsSkeleton />
                ) : data3._id ? (

                  <a href={`/news/${data3._id}`}
                    className="flex flex-col md:flex-row px-2 gap-6 w-full group"
                  >
                    <div className="w-full md:w-1/2">
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_FILE_URL}${data3.gambar}`}
                        alt={data3.judul}
                        className="w-full h-[220px] md:h-[300px] rounded-lg object-cover group-hover:opacity-90 transition-opacity"
                      />
                    </div>
                    <div className="w-full md:w-1/2 space-y-2 md:space-y-3">
                      <h3 className="text-2xl md:text-2xl font-bold text-koreaBlue line-clamp-2 group-hover:text-koreaBlue/80 transition-colors leading-snug">
                        {data3.judul}
                      </h3>
                      <p className="text-xs text-koreaBlueMuda">
                        {data3.tanggal ? formatTanggalIndonesia(data3.tanggal) : ""}
                      </p>
                      <p className="text-sm md:text-base text-gray-700 line-clamp-4 leading-relaxed">
                        {data3.deskripsi}
                      </p>
                    </div>
                  </a>
                ) : null}
              </section>

              {/* All News */}
              <section>
                <SectionHeader title="All News" />
                {!loading && data.length === 0 ? (
                  <EmptyState />
                ) : (
                  <NewsGrid
                    items={currentPage === 1 ? data.slice(1) : data}
                    loading={loading}
                    skeletonCount={9}
                  />
                )}
                {!loading && data.length > 0 && (
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
            </>
          )}

        </div>
      </main>

      <CustomFooter />
    </>
  );
}