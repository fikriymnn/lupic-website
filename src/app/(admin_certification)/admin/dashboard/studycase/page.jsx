"use client";
import Sidebar from "@/components/SidebarAdmin";
import { useEffect, useState } from "react";
import { ChevronLeft, Plus, Edit, Trash2, Eye, Search, Filter, X, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

const topikIPAOptions = [
  "Semua",
  "Energi",
  "Listrik",
  "Gaya",
  "Ekosistem",
  "Perubahan Zat",
];

export default function Studycase() {
  const router = useRouter()
  const [useCases, setUseCases] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterJenjang, setFilterJenjang] = useState("Semua");
  const [filterTopikIPA, setFilterTopikIPA] = useState("Semua");
  const [filterKompetensi, setFilterKompetensi] = useState("Semua");
  const [loading, setLoading] = useState(false)

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kasus ini?')) {
      try {
        const res = await axios.delete(process.env.NEXT_PUBLIC_API_URL + "/api/study_case/" + id)
        if (res) {
          window.location.href = "/admin/dashboard/studycase"
        }
      } catch (err) {
        console.log(err.message)
      }
    }
  };

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
      if (filterKompetensi !== "Semua") params.kompetensiGuru = filterKompetensi;
      if (searchQuery.trim() !== "") params.search = searchQuery;

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/study_case`,
        { params }
      );

      setUseCases(res.data.data);
      setTotalPage(res.data.totalPages);
      console.log(res.data)
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


  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="w-64 flex-shrink-0"></div>
      <div className='flex-1 p-6 lg:p-8'>
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
            Teacher Study Case
          </h1>
          <p className="text-gray-600">Kelola studycase</p>
        </div>
        <div className="items-center mb-8">
        </div>
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
              onClick={() => router.push("/admin/dashboard/studycase/create")}
              className="px-4 py-2 bg-indigo-600 text-sm text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 font-medium"
            >
              <Plus size={20} />
              Tambah Kasus
            </button>
          </div>

        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : useCases.length === 0 ? (
              <div className="text-center py-20">
                <Play className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada video</h3>
                <p className="text-gray-500">
                  {searchQuery ? "Tidak ditemukan hasil untuk pencarian Anda" : "Belum ada video yang ditambahkan"}
                </p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Judul Kasus</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Jenjang</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Topik</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Kompetensi</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {useCases.map((useCase) => (
                    <tr key={useCase._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-800 w-80 line-clamp-2">{useCase.judulKasus}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-[12px] text-center font-semibold rounded-full">
                          {useCase.jenjang}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-[12px] text-center font-semibold rounded-full">
                          {useCase.topikIPA}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 text-[12px] text-center font-semibold rounded-full">
                          {useCase.kompetensiGuru}
                        </span>
                      </td>
                      <td className="px-6 py-4">

                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => router.push("/admin/dashboard/studycase/" + useCase._id)}
                            className="inline-flex items-center gap-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => router.push("/admin/dashboard/studycase/" + useCase._id + "/edit")}
                            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(useCase._id)}
                            className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>)
            }
            {totalPage > 1 && (
              <div className="flex justify-center mt-8 pt-6 border-t border-gray-200">
                <ResponsivePagination
                  current={currentPage}
                  total={totalPage}
                  onPageChange={setCurrentPage}
                />
              </div>)}
          </div>
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
};