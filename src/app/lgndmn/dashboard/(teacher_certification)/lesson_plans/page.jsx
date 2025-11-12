"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download, BookOpen, Edit, Trash2, Plus, Users, CheckCircle, XCircle, Upload, Filter } from 'lucide-react';

const mockModulAjar = [
  {
    _id: '1',
    judulModul: 'Hukum Newton dan Penerapannya',
    deskripsi: 'Modul pembelajaran lengkap tentang Hukum Newton dengan pendekatan kontekstual',
    jenjang: 'SMP',
    topikIPA: 'Fisika',
    tujuanPembelajaran: 'Siswa mampu memahami dan menerapkan konsep Hukum Newton dalam kehidupan sehari-hari',
    status: 'BERBAYAR',
    file: '/files/modul-newton.pdf'
  },
  {
    _id: '2',
    judulModul: 'Fotosintesis dan Respirasi Tumbuhan',
    deskripsi: 'Modul pembelajaran interaktif tentang proses fotosintesis dan respirasi pada tumbuhan',
    jenjang: 'SD',
    topikIPA: 'Biologi',
    tujuanPembelajaran: 'Siswa dapat menjelaskan proses fotosintesis dan respirasi tumbuhan',
    status: 'GRATIS',
    file: '/files/modul-fotosintesis.pdf'
  },
  {
    _id: '3',
    judulModul: 'Siklus Air dan Perubahan Wujud',
    deskripsi: 'Modul IPA terpadu tentang siklus air dan perubahan wujud zat',
    jenjang: 'SD',
    topikIPA: 'IPA Terpadu',
    tujuanPembelajaran: 'Siswa memahami siklus air dan berbagai perubahan wujud zat',
    status: 'BERBAYAR',
    file: '/files/modul-siklus-air.pdf'
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

export default function AdminModulPanel( ){
  const [moduls, setModuls] = useState(mockModulAjar);

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus modul ini?')) {
      setModuls(moduls.filter(m => m._id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button

              className="p-2 bg-white rounded-lg shadow hover:shadow-md transition"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-4xl font-bold text-gray-800">Admin Modul Ajar</h1>
          </div>
          <button
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2 font-medium"
          >
            <Plus size={20} />
            Tambah Modul
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {moduls.map((modul) => (
            <div key={modul._id} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                  {modul.jenjang}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                  {modul.topikIPA}
                </span>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  modul.status === 'GRATIS' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {modul.status}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                {modul.judulModul}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {modul.deskripsi}
              </p>

              <div className="space-y-2">
                <button
                  onClick={() => (modul)}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                >
                  <Users size={18} />
                  Lihat Access
                </button>
                
                <div className="flex gap-2">
                  <button

                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <Edit size={18} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(modul._id)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
                  >
                    <Trash2 size={18} />
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
};