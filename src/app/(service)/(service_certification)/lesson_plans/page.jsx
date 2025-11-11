"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search, Filter, X } from "lucide-react";
import dynamic from "next/dynamic";
import CustomFooter from "@/components/CustomFooter";
import Navbar from "@/components/Navbar";
import { BiDetail } from "react-icons/bi";

const ResponsivePagination = dynamic(
  () => import("react-responsive-pagination"),
  { ssr: false }
);
import "react-responsive-pagination/themes/classic.css";

// Mock data
const mockModulAjar = [
  {
    _id: "1",
    judulModul: "Hukum Newton dan Penerapannya",
    deskripsi:
      "Modul pembelajaran lengkap tentang Hukum Newton dengan pendekatan kontekstual",
    jenjang: "SMP",
    topikIPA: "Fisika",
    tujuanPembelajaran:
      "Siswa mampu memahami dan menerapkan konsep Hukum Newton dalam kehidupan sehari-hari",
    status: "BERBAYAR",
    file: "/files/modul-newton.pdf",
    cover:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=500&fit=crop",
  },
  {
    _id: "2",
    judulModul: "Fotosintesis dan Respirasi Tumbuhan",
    deskripsi:
      "Modul pembelajaran interaktif tentang proses fotosintesis dan respirasi pada tumbuhan",
    jenjang: "SD",
    topikIPA: "Biologi",
    tujuanPembelajaran:
      "Siswa dapat menjelaskan proses fotosintesis dan respirasi tumbuhan",
    status: "GRATIS",
    file: "/files/modul-fotosintesis.pdf",
    cover:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=500&fit=crop",
  },
  {
    _id: "3",
    judulModul: "Siklus Air dan Perubahan Wujud",
    deskripsi: "Modul IPA terpadu tentang siklus air dan perubahan wujud zat",
    jenjang: "SD",
    topikIPA: "IPA Terpadu",
    tujuanPembelajaran:
      "Siswa memahami siklus air dan berbagai perubahan wujud zat",
    status: "BERBAYAR",
    file: "/files/modul-siklus-air.pdf",
    cover:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=500&fit=crop",
  },
];

// === Options untuk filter ===
const jenjangOptions = ["Semua", "SD", "SMP"];
const topikIPAOptions = ["Semua", "Fisika", "Biologi", "IPA Terpadu"];

export default function ModulAjarList() {
  const [moduls] = useState(mockModulAjar);
  const [filteredModuls, setFilteredModuls] = useState(mockModulAjar);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterJenjang, setFilterJenjang] = useState("Semua");
  const [filterTopikIPA, setFilterTopikIPA] = useState("Semua");

  const itemsPerPage = 6;

  // Filter otomatis setiap kali ada perubahan
  useEffect(() => {
    let filtered = moduls.filter((modul) => {
      const cocokSearch = modul.judulModul
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const cocokJenjang =
        filterJenjang === "Semua" || modul.jenjang === filterJenjang;
      const cocokTopik =
        filterTopikIPA === "Semua" || modul.topikIPA === filterTopikIPA;
      return cocokSearch && cocokJenjang && cocokTopik;
    });

    setFilteredModuls(filtered);
    setCurrentPage(1);
  }, [searchQuery, filterJenjang, filterTopikIPA, moduls]);

  const resetFilters = () => {
    setFilterJenjang("Semua");
    setFilterTopikIPA("Semua");
    setSearchQuery("");
  };

  const totalPages = Math.ceil(filteredModuls.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredModuls.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 px-8 md:py-16 py-24">
        <div className="max-w-6xl px-4 md:px-8 mx-auto">
          {/* Title */}
          <div className="max-w-6xl mx-auto md:block grid grid-cols-1 justify-items-center md:justify-items-start mb-8">
            <h1 className="md:text-5xl text-4xl md:mt-10 font-bold">
              Modul Ajar
            </h1>
            <div className="h-1 w-36 bg-koreaRed md:mt-3 mt-2"></div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-3 mb-8">
            <div className="w-96 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari modul ajar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              onClick={() => setShowFilterModal(true)}
              className="px-6 py-3 bg-koreaBlueMuda text-white rounded-xl transition-colors flex items-center gap-2 justify-center"
            >
              <Filter className="w-5 h-5" />
              Filter
            </button>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
            {currentItems.map((modul) => (
              <div
                key={modul._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="relative h-64 bg-koreaBlueMuda mb-4">
                    <img
                      src={modul.cover}
                      alt={modul.judulModul}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                      {modul.jenjang}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                      {modul.topikIPA}
                    </span>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${modul.status === "GRATIS"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-orange-100 text-orange-800"
                        }`}
                    >
                      {modul.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {modul.judulModul}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {modul.deskripsi}
                  </p>
                  <div className="space-y-2 flex-1 flex items-end">
                    <button
                      onClick={() => { }}
                      className="w-full px-4 py-2 bg-koreaBlueMuda text-white rounded-lg font-medium flex items-center justify-center gap-2"
                    >
                      <BiDetail size={18} />
                      Detail
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="w-[20%] m-auto mt-10 mb-10">
              <ResponsivePagination
                current={currentPage}
                total={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>

      {/* === Filter Modal === */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Filter Modul</h2>
              <button
                onClick={() => setShowFilterModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Jenjang */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Jenjang
              </label>
              <div className="grid grid-cols-2 gap-2">
                {jenjangOptions.map((jenjang) => (
                  <button
                    key={jenjang}
                    onClick={() => setFilterJenjang(jenjang)}
                    className={`py-2 rounded-lg font-semibold transition-colors ${filterJenjang === jenjang
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {jenjang}
                  </button>
                ))}
              </div>
            </div>

            {/* Topik IPA */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Topik IPA
              </label>
              <div className="grid grid-cols-2 gap-2">
                {topikIPAOptions.map((topik) => (
                  <button
                    key={topik}
                    onClick={() => setFilterTopikIPA(topik)}
                    className={`py-2 rounded-lg font-semibold transition-colors ${filterTopikIPA === topik
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {topik}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold"
              >
                Reset
              </button>
              <button
                onClick={() => setShowFilterModal(false)}
                className="flex-1 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 font-semibold"
              >
                Terapkan
              </button>
            </div>
          </div>
        </div>
      )}

      <CustomFooter />
    </>
  );
}
