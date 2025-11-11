"use client"
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";
import { Download, BookOpen, GraduationCap, Sparkles, Clock, CheckCircle } from 'lucide-react';

export default function ModulAjarDetail() {
  // Data contoh - nanti diganti dengan data dari API
  const [modul] = useState({
    judulModul: "Energi dan Perubahannya dalam Kehidupan Sehari-hari",
    cover: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=500&fit=crop",
    deskripsi: "Modul pembelajaran interaktif yang membahas konsep energi dan berbagai bentuk perubahannya. Siswa akan mempelajari energi kinetik, potensial, dan transformasi energi melalui eksperimen sederhana dan aplikasi dalam kehidupan sehari-hari.",
    jenjang: "SMP",
    topikIPA: "Fisika",
    tujuanPembelajaran: "1. Siswa dapat menjelaskan pengertian energi dan bentuk-bentuknya\n2. Siswa dapat mengidentifikasi perubahan energi dalam kehidupan sehari-hari\n3. Siswa dapat melakukan eksperimen sederhana tentang energi\n4. Siswa dapat menerapkan konsep energi untuk memecahkan masalah",
    status: "GRATIS",
    file: "https://example.com/modul-energi.pdf",
    createdAt: "2025-01-15T10:30:00Z"
  });

  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    // Simulasi download - nanti ganti dengan logika download sebenarnya
    setTimeout(() => {
      // window.open(modul.file, '_blank');
      alert('Download dimulai! File: ' + modul.file);
      setDownloading(false);
    }, 1000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getJenjangColor = (jenjang) => {
    return jenjang === 'SD' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700';
  };

  const getTopikColor = (topik) => {
    const colors = {
      'Fisika': 'bg-orange-100 text-orange-700',
      'Biologi': 'bg-green-100 text-green-700',
      'IPA Terpadu': 'bg-teal-100 text-teal-700'
    };
    return colors[topik] || 'bg-gray-100 text-gray-700';
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kolom Kiri - Cover & Download */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden top-8">
              {/* Cover Image */}
              <div className="relative h-64 bg-gradient-to-br from-blue-400 to-purple-500">
                {modul.cover ? (
                  <img 
                    src={modul.cover} 
                    alt={modul.judulModul}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <BookOpen className="w-24 h-24 text-white opacity-50" />
                  </div>
                )}
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    modul.status === 'GRATIS' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-yellow-500 text-white'
                  }`}>
                    {modul.status}
                  </span>
                </div>
              </div>

              {/* Download Section */}
              <div className="p-6">
                  <button
                      onClick={() => {}}
                      className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium flex items-center justify-center gap-2"
                    >
                      <BookOpen size={18} />
                      Buka Modul
                    </button>
                    <button
                      onClick={() => handleDownloadPDF(modul)}
                      className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition font-medium flex items-center justify-center gap-2"
                    >
                      <Download size={18} />
                      Unduh PDF
                    </button>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">Diunggah {formatDate(modul.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">File tersedia dalam format PDF</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan - Detail Modul */}
          <div className="lg:col-span-2 space-y-6">
            {/* Judul & Tags */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {modul.judulModul}
              </h1>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getJenjangColor(modul.jenjang)}`}>
                  <GraduationCap className="w-4 h-4 inline mr-1" />
                  {modul.jenjang}
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getTopikColor(modul.topikIPA)}`}>
                  <Sparkles className="w-4 h-4 inline mr-1" />
                  {modul.topikIPA}
                </span>
              </div>

              {/* Deskripsi */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Deskripsi Modul</h2>
                <p className="text-gray-700 leading-relaxed">
                  {modul.deskripsi}
                </p>
              </div>
            </div>

            {/* Tujuan Pembelajaran */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blue-600" />
                Tujuan Pembelajaran
              </h2>
              <div className="space-y-3">
                {modul.tujuanPembelajaran.split('\n').map((tujuan, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold mt-1">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed flex-1 pt-0.5">
                      {tujuan.replace(/^\d+\.\s*/, '')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CustomFooter/>
    </>
  );
}