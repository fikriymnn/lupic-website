"use client"
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/SidebarAdmin";
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import { Play, Edit, Trash2, Users, Search, Filter, X } from 'lucide-react';
import { useRouter } from "next/navigation";
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

const topikIPAOptions = [
  "Semua",
  "Fisika", "Biologi", "IPA","IPAS","Kimia","Matematika"
];

export default function VideoTrainingAdmin() {
  const router = useRouter()
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterJenjang, setFilterJenjang] = useState("Semua");
  const [filterTopikIPA, setFilterTopikIPA] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
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
      console.log(res.data)
    } catch (err) {
      console.error("Failed to fetch cases:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus video ini?')) {
      try {
        const res = await axios.delete(process.env.NEXT_PUBLIC_API_URL + "/api/video_pembelajaran/" + id)
        if (res.data) {
          window.location.href = "/admin/dashboard/video_training"
        }
      } catch (err) {
        console.log(err.message)
      }
    }
  }

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


  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="w-64 flex-shrink-0"></div>
      
      <div className="flex-1 p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
            Video Training Management
          </h1>
          <p className="text-gray-600">Kelola video pembelajaran untuk guru</p>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                placeholder="Cari video..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={() => setShowFilterModal(true)}
                className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors duration-200 shadow-sm"
              >
                <Filter className="w-5 h-5" />
                Filter
              </button>

              <button
                onClick={() => { window.location.href = "/admin/dashboard/video_training/create" }}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors duration-200 shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Tambah Video
              </button>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : data.length === 0 ? (
            <div className="text-center py-20">
              <Play className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada video</h3>
              <p className="text-gray-500">
                {searchQuery ? "Tidak ditemukan hasil untuk pencarian Anda" : "Belum ada video yang ditambahkan"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {data.map((video) => (
                <div key={video._id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  {/* Thumbnail */}
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    <img
                      src={`https://img.youtube.com/vi/${getYouTubeVideoId(video.linkVideo)}/maxresdefault.jpg`}
                      alt={video.judul}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-blue-600 ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-xl text-xs font-semibold bg-blue-100 text-blue-700`}>
                        {video.jenjang}
                      </span>
                      <span className="px-2 py-1 rounded-xl text-xs font-semibold bg-gray-100 text-gray-700">
                        {video.topikIPA}
                      </span>
                       <span className={`px-2 py-1 rounded-xl text-xs font-semibold bg-gray-100 text-gray-700 ${
                        video.status === "GRATIS" ? "bg-green-500 text-white" : "bg-yellow-400 text-gray-900"
                      }`}>
                        {video.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
                      {video.judul}
                    </h3>

                
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-2 min-h-[2.5rem] mb-4">
                      {video.deskripsi}
                    </p>
                    {
                      video.status === 'BERBAYAR' && (  
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">
                      Rp{video.harga?.toLocaleString('id-ID') || '0'}
                    </h3>
                      )
                    }
                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => { window.location.href = `/admin/dashboard/video_training/${video._id}/edit` }}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-1"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => { window.location.href = `/admin/dashboard/video_training/${video._id}` }}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-1"
                      >
                        <Users className="w-4 h-4" />
                        Akses
                      </button>
                      <button
                        onClick={() => handleDelete(video._id, video.judul)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Pagination */}
          {!loading && data.length > 0 && totalPages > 1 && (
            <div className="flex justify-center mt-8 pt-6 border-t border-gray-200">
              <ResponsivePagination
                current={currentPage}
                total={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Filter Video</h2>
              <button
                onClick={() => setShowFilterModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Jenjang Filter */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Jenjang</label>
              <div className="grid grid-cols-3 gap-2">
                {["Semua", "SD", "SMP", "SMA", "SMK"].map((jenjang) => (
                  <button
                    key={jenjang}
                    onClick={() => setFilterJenjang(jenjang)}
                    className={`py-2 rounded-lg font-semibold transition-colors ${filterJenjang === jenjang
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {jenjang}
                  </button>
                ))}
              </div>
            </div>

            {/* Topik */}
            <p className="font-semibold mb-2">Topik</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {topikIPAOptions.map((item) => (
                <button
                  key={item}
                  onClick={() => setFilterTopikIPA(item)}
                  className={`p-2 rounded-lg ${filterTopikIPA === item
                    ? "bg-koreaBlueMuda text-white"
                    : "bg-gray-200"
                    }`}
                >
                  {item}
                </button>
              ))}
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
                className="flex-1 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
              >
                Terapkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}