"use client"
import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  BookOpen,
  Edit,
  Trash2,
  Plus,
  Users,
  Play,
  XCircle, X,
  Upload,
  Filter,
  Search
} from 'lucide-react';
import Sidebar from "@/components/SidebarAdmin";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';

// === Options untuk filter ===
const jenjangOptions = ["Semua", "SD", "SMP"];
const topikIPAOptions = ["Semua", "Fisika", "Biologi", "IPA Terpadu"];
export default function AdminModulPanel() {
  const router = useRouter()
  const [moduls, setModuls] = useState([]);
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/modul_ajar`,
        { params }
      );

      setModuls(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch cases:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus modul ini?')) {
      try {
        const res = await axios.delete(process.env.NEXT_PUBLIC_API_URL + "/api/modul_ajar/" + id)
        if (res) {
          window.location.href = "/admin/dashboard/lesson_plans"
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
      <div className='flex-1 p-6 lg:p-8'>
        {/* Title */}
        <h1 className="text-3xl lg:text-4xl font-bold text-blue-600 mb-1">
          Teacher Lesson Plans
        </h1>
        <p className="text-gray-600 mb-6">Kelola modul pembelajaran untuk guru</p>

        {/* Search + Filter + Add */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari modul…"
                className="w-full pl-12 pr-4 py-3 border rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Filter + Tambah */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowFilterModal(true)}
              className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl shadow-sm">
              <Filter size={18} />
              Filter
            </button>

            <button
              onClick={() => router.push("/admin/dashboard/lesson_plans/create")}
              className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
            >
              <Plus size={18} />
              Tambah Modul
            </button>
          </div>
        </div>

        {/* Statistik / Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">

          <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Modul</p>
              <p className="text-3xl font-bold text-blue-600">{moduls.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <BookOpen className="text-blue-600" />
            </div>
          </div>


          <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Halaman</p>
              <p className="text-3xl font-bold text-green-600">
                {halamanSekarang}/{totalHalaman}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <ChevronRight className="text-green-600" />
            </div>
          </div>


          <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Hasil Halaman Ini</p>
              <p className="text-3xl font-bold text-purple-600">{filteredModuls.length}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="text-purple-600" />
            </div>
          </div>

        </div> */}

        {/* List Modul */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : moduls.length === 0 ? (
            <div className="text-center py-20">
              <Play className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada video</h3>
              <p className="text-gray-500">
                {searchQuery ? "Tidak ditemukan hasil untuk pencarian Anda" : "Belum ada video yang ditambahkan"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {moduls.map((modul) => (
                <div key={modul._id} className="bg-white rounded-xl shadow-lg flex flex-col">

                  {/* Cover */}
                  <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_FILE_URL}${modul.cover}`}
                      alt={modul.judulModul}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col">

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {modul.jenjang}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {modul.topikIPA}
                      </span>
                      <span className={`px-3 py-1 text-xs rounded-full 
                      ${modul.status === "GRATIS"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-orange-100 text-orange-800"
                        }`}>
                        {modul.status}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                      {modul.judulModul}
                    </h3>

                    {/* Desc */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                      {modul.deskripsi}
                    </p>

                        {/* Harga */}
                    {
                      modul.status === 'BERBAYAR' && (
                        <h3 className="text-lg font-bold text-gray-800 mb-4 line-clamp-2">
                          Rp{modul.harga}
                        </h3>
                      )
                    }

                    {/* Download */}
                    <button
                      onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_API_FILE_URL}${modul.file}`}
                      className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition font-medium flex items-center justify-center gap-2"
                    >
                      <Download size={18} />
                      Unduh PDF
                    </button>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4 border-t border-gray-100">

                      <button
                        onClick={() => router.push(`/admin/dashboard/lesson_plans/${modul._id}/edit`)}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 rounded-lg flex items-center justify-center gap-1"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>

                      <button
                        onClick={() => router.push(`/admin/dashboard/lesson_plans/${modul._id}`)}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm py-2 rounded-lg flex items-center justify-center gap-1"
                      >
                        <Users className="w-4 h-4" />
                        Akses
                      </button>

                      <button
                        onClick={() => handleDelete(modul._id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded-lg flex items-center justify-center gap-1"
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
        </div>
      </div>
      {/* Modal Filter */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-bold">Filter Study Case</h2>
              <button onClick={() => setShowFilterModal(false)}>
                <X />
              </button>
            </div>

            {/* Jenjang */}
            <p className="font-semibold mb-2">Jenjang</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {jenjangOptions.map((item) => (
                <button
                  key={item}
                  onClick={() => setFilterJenjang(item)}
                  className={`p-2 rounded-lg ${filterJenjang === item
                    ? "bg-koreaBlueMuda text-white"
                    : "bg-gray-200"
                    }`}
                >
                  {item}
                </button>
              ))}
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

            {/* Action */}
            <div className="flex gap-2 mt-4">
              <button
                className="flex-1 py-2 border rounded-lg"
                onClick={resetFilters}
              >
                Reset
              </button>
              <button
                className="flex-1 py-2 bg-koreaBlueMuda text-white rounded-lg"
                onClick={() => setShowFilterModal(false)}
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
