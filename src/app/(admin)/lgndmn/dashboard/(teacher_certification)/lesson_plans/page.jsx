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
  CheckCircle,
  XCircle,
  Upload,
  Filter,
  Search
} from 'lucide-react';
import Sidebar from "@/components/Sidebar";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
    cover: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=500&fit=crop",
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
    cover: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=500&fit=crop",
  },
];

export default function AdminModulPanel() {
  const router = useRouter();
  const [moduls, setModuls] = useState(mockModulAjar);
  const [search, setSearch] = useState("");

  const totalHalaman = 2;
  const halamanSekarang = 1;

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus modul ini?')) {
      setModuls(moduls.filter(m => m._id !== id));
    }
  };

  const filteredModuls = moduls.filter((m) =>
    m.judulModul.toLowerCase().includes(search.toLowerCase())
  );

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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari modul…"
                  className="w-full pl-12 pr-4 py-3 border rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Filter + Tambah */}
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl shadow-sm">
                <Filter size={18} />
                Filter
              </button>

              <button
                onClick={() => router.push("/lgndmn/dashboard/lesson_plans/create")}
                className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
              >
                <Plus size={18} />
                Tambah Modul
              </button>
            </div>
          </div>

          {/* Statistik / Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">

            {/* Total Modul */}
            <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Modul</p>
                <p className="text-3xl font-bold text-blue-600">{moduls.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <BookOpen className="text-blue-600" />
              </div>
            </div>

            {/* Halaman */}
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

            {/* Hasil Halaman Ini */}
            <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Hasil Halaman Ini</p>
                <p className="text-3xl font-bold text-purple-600">{filteredModuls.length}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="text-purple-600" />
              </div>
            </div>

          </div>

          {/* List Modul */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModuls.map((modul) => (
              <div key={modul._id} className="bg-white rounded-xl shadow-lg flex flex-col">
                
                {/* Cover */}
                <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                  <Image
                    src={modul.cover}
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
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {modul.judulModul}
                  </h3>

                  {/* Desc */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                    {modul.deskripsi}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    
                    <button
                      onClick={() => router.push(`/lgndmn/dashboard/lesson_plans/${modul._id}/edit`)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 rounded-lg flex items-center justify-center gap-1"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>

                    <button
                      onClick={() => router.push(`/lgndmn/dashboard/lesson_plans/${modul._id}/access`)}
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
</div>
        </div>
  );
}
