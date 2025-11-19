"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";
import dynamic from "next/dynamic";

const ResponsivePagination = dynamic(
  () => import("react-responsive-pagination"),
  { ssr: false }
);
import "react-responsive-pagination/themes/classic.css";
import { useRouter } from "next/navigation";
import {
  Play,
  Filter,
  X,
  Search,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import axios from "axios";


function getYouTubeVideoId(url) {
  try {
    // 1. Jika URL dalam bentuk youtu.be/xxxx
    let shortMatch = url.match(/youtu\.be\/([^?]+)/);
    if (shortMatch) return shortMatch[1];

    // 2. Jika URL dalam bentuk youtube.com/watch?v=xxxx
    let watchMatch = url.match(/v=([^&]+)/);
    if (watchMatch) return watchMatch[1];

    // 3. Jika URL dalam bentuk embed/xxxx
    let embedMatch = url.match(/embed\/([^?]+)/);
    if (embedMatch) return embedMatch[1];

    // 4. Jika URL Shorts (youtube.com/shorts/xxxx)
    let shortsMatch = url.match(/shorts\/([^?]+)/);
    if (shortsMatch) return shortsMatch[1];

    // 5. Jika URL punya parameter videoId
    let paramMatch = url.match(/videoId=([^&]+)/);
    if (paramMatch) return paramMatch[1];

    return null; // Tidak ketemu ID
  } catch (error) {
    return null;
  }
}

const topikOptions = [
  "Semua",
  "Energi",
  "Listrik",
  "Gaya",
  "Ekosistem",
  "Perubahan Zat",
];

// ====== Main Component ======
export default function VideoTrainingApp() {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterJenjang, setFilterJenjang] = useState("Semua");
  const [filterTopikIPA, setFilterTopikIPA] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(false)
  // 🔥 Fetch ke Backend
  const fetchStudyCase = async () => {
    try {
      setLoading(true);

      const params = {
        page: currentPage,
        limit: 12,
      };

      if (filterTopikIPA !== "Semua") params.topikIPA = filterTopikIPA;
      if (filterJenjang !== "Semua") params.jenjang = filterJenjang;
      if (searchQuery.trim() !== "") params.search = searchQuery;

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/video_pembelajaran`,
        { params }
      );

      setData(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch cases:", err);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch setiap ada perubahan filter/page
  useEffect(() => {
    fetchStudyCase();
  }, [currentPage, filterTopikIPA, filterJenjang]);

  // Search delay
  useEffect(() => {
    const delay = setTimeout(() => {
      setCurrentPage(1);
      fetchStudyCase();
    }, 500);

    return () => clearTimeout(delay);
  }, [searchQuery]);

  const resetFilters = () => {
    setFilterTopikIPA("Semua");
    setFilterJenjang("Semua");
    setSearchQuery("");
    setCurrentPage(1);
  };

  async function getUser() {
    try {
      const resUser = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/api/public/user",
        { withCredentials: true }
      );
      setUser(resUser.data)
    } catch (err) {
      setUser(false)
    }
  }

  useEffect(() => {
    getUser()
    setIsMounted(true)
  }, [])
  if (!isMounted) {
    return null
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 mt-8 pb-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
          {/* Title */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 justify-items-center md:justify-items-start mb-8">
            <h1 className="md:text-4xl text-4xl md:mt-10 font-bold">
              Video Pembelajaran
            </h1>
            <div className="h-1 w-36 bg-koreaRed md:mt-3 mt-2"></div>
          </div>
          <p className="text-gray-700 mb-8 leading-relaxed">
            Fitur Video Pembelajaran merupakan bagian dari website layanan Inspira PPG yang berfungsi sebagai media latihan dan observasi pembelajaran bagi calon guru. Fitur ini menyediakan kumpulan video berbasis praktik mengajar yang disusun sesuai Kurikulum Merdeka untuk jenjang SD dan SMP pada bidang IPA.
          </p>
          
          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-3 mb-8">
            <div className="w-full md:w-96 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari video pembelajaran..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              onClick={() => setShowFilterModal(true)}
              className="px-6 py-3 bg-koreaBlueMuda text-white rounded-xl transition-colors flex items-center gap-2 justify-center "
            >
              <Filter className="w-5 h-5" />
              Filter
            </button>
          </div>

          {/* Video Grid */}
          {data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((video) => (
                <div
                  key={video._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={`https://img.youtube.com/vi/${getYouTubeVideoId(
                        video.linkVideo
                      )}/maxresdefault.jpg`}
                      alt={video.judul}
                      fill
                      className="object-cover opacity-80"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-purple-600 ml-1" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col h-full flex-1">
                    <div className="flex gap-2 mb-3">
                      <span
                        className={`px-2 py-1 rounded-xl text-xs font-semibold bg-blue-100 text-blue-700`}
                      >
                        {video.jenjang}
                      </span>
                      <span className="px-2 py-1 rounded-xl text-xs font-semibold bg-gray-100 text-gray-700">
                        {video.topikIPA}
                      </span>
                      <span className={`px-2 py-1 rounded-xl text-xs font-semibold bg-gray-100 text-gray-700 ${video.status === "GRATIS" ? "bg-green-500 text-white" : "bg-yellow-400 text-gray-900"
                        }`}>
                        {video.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {video.judul}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {video.deskripsi}
                    </p>

                    <div className="flex items-end justify-end flex-1">
                      <button className="px-4 py-2 bg-koreaBlueMuda text-white rounded-lg transition-colors text-sm font-semibold flex items-center gap-1"
                        onClick={() => {
                          if (!user) {
                            router.push("/login?prev=video_training")
                          } else {
                            router.push("/video_training/" + video._id)
                          }
                        }}
                      >
                        Detail
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Tidak ada video ditemukan
              </h3>
              <p className="text-gray-500">
                Coba ubah filter atau kata kunci pencarian
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 mb-10">
              <ResponsivePagination
                current={currentPage}
                total={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>

        {/* Filter Modal */}
        {showFilterModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Filter Video
                </h2>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Jenjang Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Jenjang
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Semua", "SD", "SMP"].map((jenjang) => (
                    <button
                      key={jenjang}
                      onClick={() => setFilterJenjang(jenjang)}
                      className={`py-2 rounded-lg font-semibold transition-colors ${filterJenjang === jenjang
                        ? "bg-koreaBlueMuda text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      {jenjang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Topik Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Topik IPA
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {topikOptions.map((topik) => (
                    <button
                      key={topik}
                      onClick={() => setFilterTopikIPA(topik)}
                      className={`py-2 rounded-lg font-semibold transition-colors ${filterTopikIPA === topik
                        ? "bg-koreaBlueMuda text-white"
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
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="flex-1 py-3 bg-koreaBlueMuda text-white rounded-xl hover:bg-purple-700 transition-colors font-semibold"
                >
                  Terapkan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <CustomFooter />
    </>
  );
}