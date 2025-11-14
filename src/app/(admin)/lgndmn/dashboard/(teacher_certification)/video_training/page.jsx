"use client"
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import { Play, Edit, Trash2, Users, Search, Filter, X } from 'lucide-react';

// Data Dummy
const mockVideosData = [
  {
    _id: "1",
    judul: "Pengenalan Energi dan Bentuk-bentuknya",
    tujuanPembelajaran: "Siswa mampu memahami konsep energi dan mengidentifikasi berbagai bentuk energi dalam kehidupan sehari-hari",
    deskripsi: "Video pembelajaran interaktif tentang konsep dasar energi, meliputi energi kinetik, potensial, panas, listrik, dan cahaya. Dilengkapi dengan animasi dan contoh aplikasi dalam kehidupan nyata.",
    linkVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    jenjang: "SMP",
    topikIPA: "Energi",
    status: "GRATIS",
    createdAt: "2025-01-10T08:00:00Z",
  },
  {
    _id: "2",
    judul: "Rangkaian Listrik Sederhana",
    tujuanPembelajaran: "Siswa dapat membuat dan memahami prinsip kerja rangkaian listrik sederhana",
    deskripsi: "Pembelajaran praktis tentang listrik, cara membuat rangkaian seri dan paralel, serta memahami komponen dasar seperti baterai, lampu, dan saklar.",
    linkVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    jenjang: "SD",
    topikIPA: "Listrik",
    status: "BERBAYAR",
    createdAt: "2025-01-12T10:30:00Z",
  },
  {
    _id: "3",
    judul: "Gaya dan Gerak dalam Kehidupan Sehari-hari",
    tujuanPembelajaran: "Siswa mampu menjelaskan hubungan antara gaya dan gerak benda",
    deskripsi: "Eksplorasi konsep gaya, gesekan, gravitasi, dan pengaruhnya terhadap gerakan benda. Dengan demonstrasi eksperimen sederhana yang mudah dipahami.",
    linkVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    jenjang: "SMP",
    topikIPA: "Gaya",
    status: "GRATIS",
    createdAt: "2025-01-15T14:20:00Z",
  },
  {
    _id: "4",
    judul: "Ekosistem dan Rantai Makanan",
    tujuanPembelajaran: "Siswa dapat memahami hubungan antar makhluk hidup dalam ekosistem",
    deskripsi: "Penjelasan lengkap tentang ekosistem, produsen, konsumen, dekomposer, dan rantai makanan. Dilengkapi dengan contoh ekosistem lokal Indonesia.",
    linkVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    jenjang: "SD",
    topikIPA: "Ekosistem",
    status: "GRATIS",
    createdAt: "2025-01-18T09:15:00Z",
  },
  {
    _id: "5",
    judul: "Perubahan Wujud Zat",
    tujuanPembelajaran: "Siswa mampu mengidentifikasi dan menjelaskan berbagai perubahan wujud zat",
    deskripsi: "Video pembelajaran tentang mencair, membeku, menguap, mengembun, menyublim dengan eksperimen menarik dan mudah dipraktikkan di rumah.",
    linkVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    jenjang: "SMP",
    topikIPA: "Perubahan Zat",
    status: "BERBAYAR",
    createdAt: "2025-01-20T11:45:00Z",
  },
  {
    _id: "6",
    judul: "Sistem Tata Surya dan Planet",
    tujuanPembelajaran: "Siswa dapat mengenal planet-planet dalam tata surya dan karakteristiknya",
    deskripsi: "Perjalanan menakjubkan menjelajahi tata surya, mengenal 8 planet, satelit, asteroid, dan komet. Visualisasi 3D yang memukau.",
    linkVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    jenjang: "SD",
    topikIPA: "Astronomi",
    status: "GRATIS",
    createdAt: "2025-01-22T13:30:00Z",
  },
  {
    _id: "7",
    judul: "Fotosintesis pada Tumbuhan",
    tujuanPembelajaran: "Siswa memahami proses fotosintesis dan pentingnya bagi kehidupan",
    deskripsi: "Penjelasan detail proses fotosintesis dengan animasi, mulai dari penyerapan cahaya matahari hingga produksi oksigen dan glukosa.",
    linkVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    jenjang: "SMP",
    topikIPA: "Biologi",
    status: "BERBAYAR",
    createdAt: "2025-01-25T10:00:00Z",
  },
  {
    _id: "8",
    judul: "Siklus Air dan Manfaatnya",
    tujuanPembelajaran: "Siswa dapat menjelaskan proses siklus air di alam",
    deskripsi: "Video pembelajaran tentang perjalanan air dari laut ke atmosfer dan kembali ke bumi, pentingnya siklus air bagi kehidupan.",
    linkVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    jenjang: "SD",
    topikIPA: "Hidrologi",
    status: "GRATIS",
    createdAt: "2025-01-28T15:20:00Z",
  },
  {
    _id: "9",
    judul: "Magnet dan Sifat-sifatnya",
    tujuanPembelajaran: "Siswa mampu mengidentifikasi sifat-sifat magnet dan penerapannya",
    deskripsi: "Pembelajaran interaktif tentang kutub magnet, medan magnet, gaya tarik menarik dan tolak menolak, serta aplikasi magnet dalam teknologi.",
    linkVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    jenjang: "SMP",
    topikIPA: "Magnet",
    status: "GRATIS",
    createdAt: "2025-01-30T08:45:00Z",
  },
  {
    _id: "10",
    judul: "Sistem Pencernaan Manusia",
    tujuanPembelajaran: "Siswa dapat memahami organ-organ pencernaan dan fungsinya",
    deskripsi: "Perjalanan makanan dari mulut hingga usus besar, penjelasan lengkap fungsi setiap organ pencernaan dengan animasi 3D yang detail.",
    linkVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    jenjang: "SD",
    topikIPA: "Anatomi",
    status: "BERBAYAR",
    createdAt: "2025-02-01T12:00:00Z",
  },
];

export default function VideoTrainingAdmin() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allData] = useState(mockVideosData);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [filterJenjang, setFilterJenjang] = useState("Semua");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const itemsPerPage = 9;

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    // Filter data dummy
    let filtered = [...allData];

    // Filter by search
    if (search.trim()) {
      filtered = filtered.filter(video =>
        video.judul.toLowerCase().includes(search.toLowerCase()) ||
        video.deskripsi.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by jenjang
    if (filterJenjang !== "Semua") {
      filtered = filtered.filter(video => video.jenjang === filterJenjang);
    }

    // Filter by status
    if (filterStatus !== "Semua") {
      filtered = filtered.filter(video => video.status === filterStatus);
    }

    // Set total items
    setTotalItems(filtered.length);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));

    // Paginate
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);
    
    setData(paginatedData);
  }, [currentPage, search, filterJenjang, filterStatus, allData]);

  const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleDelete = async (id, judul) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus video "${judul}"?`)) return;
    
    // Simulate delete (untuk dummy data)
    alert("Video berhasil dihapus (simulasi)");
    
    // Untuk production, uncomment code dibawah:
    /*
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/video_training/${id}`, {
        method: 'DELETE'
      });
      const result = await response.json();
      
      if (result === "success") {
        alert("Video berhasil dihapus");
        window.location.reload();
      }
    } catch (err) {
      console.error("Error deleting video:", err);
      alert("Gagal menghapus video");
    }
    */
  };

  const resetFilters = () => {
    setFilterJenjang("Semua");
    setFilterStatus("Semua");
    setSearchInput("");
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
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              {searchInput && (
                <button
                  onClick={() => setSearchInput("")}
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
                onClick={() => { window.location.href = "/lgndmn/dashboard/video_training/create" }}
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

        {/* Stats Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Video</p>
                <p className="text-2xl font-bold text-blue-600">{totalItems}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Play className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Halaman</p>
                <p className="text-2xl font-bold text-green-600">{currentPage}/{totalPages}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Hasil {search ? "Pencarian" : "Halaman Ini"}</p>
                <p className="text-2xl font-bold text-purple-600">{data.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
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
                {search ? "Tidak ditemukan hasil untuk pencarian Anda" : "Belum ada video yang ditambahkan"}
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
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        video.status === "GRATIS" ? "bg-green-500 text-white" : "bg-yellow-400 text-gray-900"
                      }`}>
                        {video.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                        video.jenjang === "SD" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                      }`}>
                        {video.jenjang}
                      </span>
                      <span className="px-2 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700">
                        {video.topikIPA}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-blue-600 mb-2 line-clamp-2 min-h-[3.5rem]">
                      {video.judul}
                    </h3>

                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-2 min-h-[2.5rem] mb-4">
                      {video.deskripsi}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => { window.location.href = `/lgndmn/dashboard/video_training/${video._id}` }}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-1"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => { window.location.href = `/lgndmn/dashboard/video_training/access/${video._id}` }}
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
                {["Semua", "SD", "SMP"].map((jenjang) => (
                  <button
                    key={jenjang}
                    onClick={() => setFilterJenjang(jenjang)}
                    className={`py-2 rounded-lg font-semibold transition-colors ${
                      filterJenjang === jenjang
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {jenjang}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Status</label>
              <div className="grid grid-cols-3 gap-2">
                {["Semua", "GRATIS", "BERBAYAR"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`py-2 rounded-lg font-semibold transition-colors ${
                      filterStatus === status
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {status}
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