"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download, BookOpen, Edit, Trash2, Plus, Users, CheckCircle, XCircle, Upload, Filter } from 'lucide-react';
import dynamic from "next/dynamic";
import CustomFooter from "@/components/CustomFooter";
import Navbar from "@/components/Navbar";
// Import pagination secara dinamis
const ResponsivePagination = dynamic(
  () => import("react-responsive-pagination"),
  { ssr: false }
);
import "react-responsive-pagination/themes/classic.css";
import { BiDetail } from 'react-icons/bi';

// Mock data
const mockModulAjar = [
  {
    _id: '1',
    judulModul: 'Hukum Newton dan Penerapannya',
    deskripsi: 'Modul pembelajaran lengkap tentang Hukum Newton dengan pendekatan kontekstual',
    jenjang: 'SMP',
    topikIPA: 'Fisika',
    tujuanPembelajaran: 'Siswa mampu memahami dan menerapkan konsep Hukum Newton dalam kehidupan sehari-hari',
    status: 'BERBAYAR',
    file: '/files/modul-newton.pdf',
    cover: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=500&fit=crop'
  },
  {
    _id: '2',
    judulModul: 'Fotosintesis dan Respirasi Tumbuhan',
    deskripsi: 'Modul pembelajaran interaktif tentang proses fotosintesis dan respirasi pada tumbuhan',
    jenjang: 'SD',
    topikIPA: 'Biologi',
    tujuanPembelajaran: 'Siswa dapat menjelaskan proses fotosintesis dan respirasi tumbuhan',
    status: 'GRATIS',
    file: '/files/modul-fotosintesis.pdf',
    cover: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=500&fit=crop'
  },
  {
    _id: '3',
    judulModul: 'Siklus Air dan Perubahan Wujud',
    deskripsi: 'Modul IPA terpadu tentang siklus air dan perubahan wujud zat',
    jenjang: 'SD',
    topikIPA: 'IPA Terpadu',
    tujuanPembelajaran: 'Siswa memahami siklus air dan berbagai perubahan wujud zat',
    status: 'BERBAYAR',
    file: '/files/modul-siklus-air.pdf',
    cover: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=500&fit=crop'
  }
];

const mockModulAccess = [
  {
    _id: '1',
    modulAjar: '1',
    nama: 'Ibu Sarah Wijaya',
    email: 'sarah@email.com',
    no_whatsapp: '081234567890',
    provinsi: 'Jawa Timur',
    jenjang_sekolah: 'SMP',
    nama_instansi: 'SMP Negeri 1 Surabaya',
    mata_pelajaran: 'IPA',
    status_ppg: 'PPG Calon Guru/PPG luar jabatan (Prajabatan)',
    sumber_informasi: 'Media Sosial (Instagram, Facebook, TikTok, X, dll.)',
    status: 'NO ACCESS',
    tanggal_pengisi: new Date('2024-11-01'),
    bukti_pembayaran: '/uploads/bukti-sarah.jpg'
  }
];

const SUMBER_INFORMASI_OPTIONS = [
  'Media Sosial (Instagram, Facebook, TikTok, X, dll.)',
  'Website Resmi Universitas / Kampus Penyelenggara',
  'Teman / Rekan Guru / Komunitas Pendidik',
  'Grup WhatsApp / Telegram / Komunitas Daring Guru',
  'Dosen / Pembimbing Kampus / Alumni PPG',
  'Seminar / Webinar Pendidikan / Workshop Daring',
  'Poster / Brosur / Pamflet Digital',
  'Iklan Internet (Google Ads / YouTube / Media Online)',
  'Dinas Pendidikan / LPTK / Sekolah Asal',
  'Lainnya'
];

export default function ModulAjarList({ onBukaModul, onAdminClick }) {
  const [moduls, setModuls] = useState(mockModulAjar);
  const [filteredModuls, setFilteredModuls] = useState(mockModulAjar);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    jenjang: '',
    topikIPA: ''
  });
  const itemsPerPage = 6;

  useEffect(() => {
    let filtered = moduls;

    if (filters.jenjang) {
      filtered = filtered.filter(m => m.jenjang === filters.jenjang);
    }
    if (filters.topikIPA) {
      filtered = filtered.filter(m => m.topikIPA === filters.topikIPA);
    }

    setFilteredModuls(filtered);
    setCurrentPage(1);
  }, [filters, moduls]);

  const totalPages = Math.ceil(filteredModuls.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredModuls.slice(startIndex, startIndex + itemsPerPage);

  const handleDownloadPDF = (modul) => {
    alert(`Mengunduh PDF: ${modul.judulModul}`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 px-8 md:py-16 py-24">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="max-w-6xl mx-auto md:block grid grid-cols-1 justify-items-center md:justify-items-start mb-8">
            <h1 className="md:text-5xl text-4xl md:mt-10 font-bold">
              Modul Ajar
            </h1>
            <div className="h-1 w-36 bg-koreaRed md:mt-3 mt-2"></div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-800">Filter Modul</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={filters.jenjang}
                onChange={(e) => setFilters({ ...filters, jenjang: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Semua Jenjang</option>
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
              </select>

              <select
                value={filters.topikIPA}
                onChange={(e) => setFilters({ ...filters, topikIPA: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Semua Topik</option>
                <option value="Fisika">Fisika</option>
                <option value="Biologi">Biologi</option>
                <option value="IPA Terpadu">IPA Terpadu</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
            {currentItems.map((modul) => (
              <div key={modul._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1 m-2" >
                <div className="p-6 h-full flex flex-col">
                  <div className="relative h-64 bg-gradient-to-br from-blue-400 to-purple-500 mb-4">
                    <img
                      src={modul.cover}
                      alt={modul.judulModul}
                      className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                      {modul.jenjang}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                      {modul.topikIPA}
                    </span>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${modul.status === 'GRATIS'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-orange-100 text-orange-800'
                      }`}>
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
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-purple-700 transition font-medium flex items-center justify-center gap-2"
                    >
                      <BiDetail size={18} />
                      Detail
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-white shadow disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft />
              </button>

              <span className="text-gray-700 font-medium">
                Halaman {currentPage} dari {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-white shadow disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </div>
        <div className="w-[20%] m-auto pt-8 pb-8 bg-gray-100">
          <ResponsivePagination
            current={currentPage}
            total={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
      <CustomFooter />
    </>
  );
};
