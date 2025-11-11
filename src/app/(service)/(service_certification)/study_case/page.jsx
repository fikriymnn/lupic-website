"use client";
import React, { useState, useEffect } from 'react';
import CustomFooter from "@/components/CustomFooter";
import Navbar from "@/components/Navbar";
import { ChevronLeft, ChevronRight, Search, Filter, X } from 'lucide-react';

import dynamic from "next/dynamic";

const ResponsivePagination = dynamic(
  () => import("react-responsive-pagination"),
  { ssr: false }
);
import "react-responsive-pagination/themes/classic.css";

import { useRouter } from 'next/navigation';

// Mock data
const mockUseCases = [
  {
    _id: '1',
    judulKasus: 'Pemanfaatan Energi Listrik di Rumah Tangga',
    deskripsi: 'Kasus tentang cara guru menjelaskan konsep energi listrik dalam kehidupan sehari-hari.',
    jenjang: 'SMP',
    topikIPA: 'Listrik',
    kompetensiGuru: 'Pedagogik',
  },
  {
    _id: '2',
    judulKasus: 'Pembelajaran Ekosistem melalui Observasi Lapangan',
    deskripsi: 'Guru mengajak siswa mengamati lingkungan sekitar untuk memahami konsep ekosistem.',
    jenjang: 'SD',
    topikIPA: 'Ekosistem',
    kompetensiGuru: 'Profesional',
  },
  {
    _id: '3',
    judulKasus: 'Demonstrasi Perubahan Zat pada Proses Pencairan',
    deskripsi: 'Siswa melakukan eksperimen sederhana untuk melihat perubahan wujud zat.',
    jenjang: 'SD',
    topikIPA: 'Perubahan Zat',
    kompetensiGuru: 'Pedagogik',
  },
];

const topikOptions = ["Semua", "Energi", "Listrik", "Ekosistem", "Perubahan Zat"];
const jenjangOptions = ["Semua", "SD", "SMP"];
const kompetensiOptions = ["Semua", "Pedagogik", "Profesional"];

export default function CaseStudy() {
  const router = useRouter();
  const [studyCase] = useState(mockUseCases);
  const [filteredStudyCase, setFilteredStudyCase] = useState(mockUseCases);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterTopik, setFilterTopik] = useState('Semua');
  const [filterJenjang, setFilterJenjang] = useState('Semua');
  const [filterKompetensi, setFilterKompetensi] = useState('Semua');
  const itemsPerPage = 6;

  const resetFilters = () => {
    setFilterJenjang('Semua');
    setFilterTopik('Semua');
    setFilterKompetensi('Semua');
    setSearchQuery('');
  };

  // Filtering logic
  useEffect(() => {
    let filtered = studyCase.filter((item) => {
      const matchSearch =
        item.judulKasus.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());

      const matchTopik = filterTopik === 'Semua' || item.topikIPA === filterTopik;
      const matchJenjang = filterJenjang === 'Semua' || item.jenjang === filterJenjang;
      const matchKompetensi = filterKompetensi === 'Semua' || item.kompetensiGuru === filterKompetensi;

      return matchSearch && matchTopik && matchJenjang && matchKompetensi;
    });

    setFilteredStudyCase(filtered);
    setCurrentPage(1);
  }, [studyCase, searchQuery, filterTopik, filterJenjang, filterKompetensi]);

  const totalPages = Math.ceil(filteredStudyCase.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredStudyCase.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6 md:pt-16 pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className='pb-6'>
            <h1 className="md:text-5xl text-2xl mt-10 font-bold">Study Case</h1>
            <div className="h-1 w-36 bg-koreaRed md:mt-4 mt-2"></div>
          </div>

          <div className="flex flex-col mb-8">
            <p className='text-gray-800'>
              Kumpulan studi kasus pembelajaran IPA berdasarkan topik, jenjang, dan kompetensi guru.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row gap-3 mb-8">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari study case..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              onClick={() => setShowFilterModal(true)}
              className="px-6 py-2 bg-koreaBlueMuda text-white rounded-xl transition-colors flex items-center gap-2 justify-center"
            >
              <Filter className="w-5 h-5" />
              Filter
            </button>
          </div>

          {/* Use Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentItems.map((useCase) => (
              <a href="/study_case/123"
                key={useCase._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                      {useCase.jenjang}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                      {useCase.topikIPA}
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
                      {useCase.kompetensiGuru}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {useCase.judulKasus}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 flex-1 h-full">
                    {useCase.deskripsi}
                  </p>
                  <button
                    onClick={() => router.push(`/case_study/${useCase._id}`)}
                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                  >
                    Pelajari Kasus
                  </button>
                </div>
              </a>
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

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Filter Study Case</h2>
              <button onClick={() => setShowFilterModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Jenjang */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Jenjang</label>
              <div className="grid grid-cols-3 gap-2">
                {jenjangOptions.map((jenjang) => (
                  <button
                    key={jenjang}
                    onClick={() => setFilterJenjang(jenjang)}
                    className={`py-2 rounded-lg font-semibold transition-colors ${
                      filterJenjang === jenjang ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {jenjang}
                  </button>
                ))}
              </div>
            </div>

            {/* Topik */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Topik</label>
              <div className="grid grid-cols-2 gap-2">
                {topikOptions.map((topik) => (
                  <button
                    key={topik}
                    onClick={() => setFilterTopik(topik)}
                    className={`py-2 rounded-lg font-semibold transition-colors ${
                      filterTopik === topik ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {topik}
                  </button>
                ))}
              </div>
            </div>

            {/* Kompetensi Guru */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Kompetensi Guru</label>
              <div className="grid grid-cols-2 gap-2">
                {kompetensiOptions.map((komp) => (
                  <button
                    key={komp}
                    onClick={() => setFilterKompetensi(komp)}
                    className={`py-2 rounded-lg font-semibold transition-colors ${
                      filterKompetensi === komp ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {komp}
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
