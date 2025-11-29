"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, Filter, X } from "lucide-react";

import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";
import dynamic from "next/dynamic";

const ResponsivePagination = dynamic(
  () => import("react-responsive-pagination"),
  { ssr: false }
);

import "react-responsive-pagination/themes/classic.css";
const topikOptions = ["Semua", "Energi", "Listrik", "Ekosistem", "Perubahan Zat"];
const jenjangOptions = ["Semua", "SD", "SMP"];
const kompetensiOptions = ["Semua", "Pedagogik", "Profesional"];

export default function CaseStudy() {
  const router = useRouter();

  const [user, setUser] = useState(false)
  const [studyCase, setStudyCase] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filterTopik, setFilterTopik] = useState("Semua");
  const [filterJenjang, setFilterJenjang] = useState("Semua");
  const [filterKompetensi, setFilterKompetensi] = useState("Semua");

  const [showFilterModal, setShowFilterModal] = useState(false);

  const limit = 6;

  // 🔥 Fetch ke Backend
  const fetchStudyCase = async () => {
    try {
      setLoading(true);

      const params = {
        page: currentPage,
        limit: limit,
      };

      if (filterTopik !== "Semua") params.topikIPA = filterTopik;
      if (filterJenjang !== "Semua") params.jenjang = filterJenjang;
      if (filterKompetensi !== "Semua") params.kompetensiGuru = filterKompetensi;
      if (searchQuery.trim() !== "") params.search = searchQuery;

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/study_case`,
        { params }
      );

      setStudyCase(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch cases:", err);
    } finally {
      setLoading(false);
    }
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

  // Trigger fetch setiap ada perubahan filter/page
  useEffect(() => {
    fetchStudyCase();
    getUser()
  }, [currentPage, filterTopik, filterJenjang, filterKompetensi]);

  // Search delay
  useEffect(() => {
    const delay = setTimeout(() => {
      setCurrentPage(1);
      fetchStudyCase();
    }, 500);

    return () => clearTimeout(delay);
  }, [searchQuery]);

  const resetFilters = () => {
    setFilterTopik("Semua");
    setFilterJenjang("Semua");
    setFilterKompetensi("Semua");
    setSearchQuery("");
    setCurrentPage(1);
  };

function formatNumberID(num) {
  return num.toLocaleString("id-ID");
}

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6 md:pt-16 pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto md:block grid grid-cols-1 justify-items-center md:justify-items-start mb-8">
            <h1 className="md:text-4xl text-4xl md:mt-10 font-bold">
              Study Case
            </h1>
            <div className="h-1 w-36 bg-koreaRed md:mt-3 mt-2"></div>
          </div>

          <p className="text-gray-700 mb-8 leading-relaxed">
            Fitur Studi Kasus merupakan simulasi pembelajaran berbasis permasalahan yang dirancang untuk mengembangkan kemampuan analisis dan refleksi calon guru dalam konteks nyata. Fitur ini menyajikan berbagai kasus otentik yang sering muncul dalam praktik pembelajaran IPA di sekolah dasar dan menengah pertama
          </p>

          {/* Search + Filter */}
          <div className="flex flex-col md:flex-row gap-3 mb-8 mt-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari study case..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              className="px-6 py-2 bg-koreaBlueMuda text-white rounded-xl flex items-center gap-2"
              onClick={() => setShowFilterModal(true)}
            >
              <Filter className="w-5 h-5" /><p> Filter</p>
            </button>
          </div>

          {/* Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {loading ? (
              <p>Loading...</p>
            ) : studyCase.length === 0 ? (
              <p>Tidak ada data ditemukan.</p>
            ) : (
              studyCase.map((useCase) => (
                <div
                  key={useCase._id}
                  className="bg-white rounded-lg shadow-lg p-6 hover:-translate-y-1 transition flex flex-col"
                >
                  <div className="flex gap-2 mb-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full flex items-center">
                      {useCase.jenjang}
                    </span>

                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full flex items-center">
                      {useCase.topikIPA}
                    </span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-semibold text-xs flex items-center">
                      {useCase.kompetensiGuru}
                    </span>
                    <span className={`px-2 py-1 rounded-xl text-xs font-semibold bg-gray-100 text-gray-700 flex items-center ${useCase.status === "GRATIS" ? "bg-green-500 text-white" : "bg-yellow-400 text-gray-900"
                        }`}>
                        {useCase.status}
                      </span>
                  </div>

                  <h3 className="text-lg font-bold mb-2 line-clamp-2">
                    {useCase.judulKasus}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                    {useCase.deskripsi}
                  </p>

                  <div className="flex items-end justify-between flex-1 mt-4">
                    {useCase.status === "BERBAYAR" ? (
                      <div className="">
                        <p className="text-base font-bold text-gray-900">
                          Rp {useCase.harga?.toLocaleString('id-ID') || '0'}
                        </p>
                      </div>
                    ) : <div></div>}
                    <button
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                    onClick={() => {
                      if (!user) {
                        router.push("/login?prev=study_case")
                      } else {
                        router.push("/study_case/" + useCase._id)
                      }
                    }
                    }
                  >
                    Pelajari Kasus
                  </button>
                  </div>
                  
                </div>
              ))
            )}
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
              {topikOptions.map((item) => (
                <button
                  key={item}
                  onClick={() => setFilterTopik(item)}
                  className={`p-2 rounded-lg ${filterTopik === item
                    ? "bg-koreaBlueMuda text-white"
                    : "bg-gray-200"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Kompetensi */}
            <p className="font-semibold mb-2">Kompetensi Guru</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {kompetensiOptions.map((item) => (
                <button
                  key={item}
                  onClick={() => setFilterKompetensi(item)}
                  className={`p-2 rounded-lg ${filterKompetensi === item
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
      <CustomFooter />
    </>
  );
}
