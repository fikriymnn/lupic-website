"use client"
import { Play, Filter, X, Search, BookOpen, ChevronRight, ExternalLink, Target, FileText } from 'lucide-react';

const videoData = {
    _id: "1",
    judul: "Pengenalan Energi dan Bentuk-bentuknya",
    tujuanPembelajaran: "Siswa mampu memahami konsep energi dan mengidentifikasi berbagai bentuk energi dalam kehidupan sehari-hari",
    deskripsi: "Video pembelajaran interaktif tentang konsep dasar energi, meliputi energi kinetik, potensial, panas, listrik, dan cahaya. Dilengkapi dengan animasi dan contoh aplikasi dalam kehidupan nyata.",
    linkVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    jenjang: "SMP",
    topikIPA: "Energi",
    status: "GRATIS",
    createdAt: "2025-01-10T08:00:00Z"
  }


export default function DetailVideoTraining(){
      const handleBackToList = () => {
  };
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <button 
              onClick={handleBackToList}
              className="text-gray-600 hover:text-gray-900 flex items-center gap-2 font-semibold"
            >
              ← Kembali ke Daftar Video
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Video Player Section */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
            <div className="relative pb-[56.25%] bg-gray-900">
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={`https://img.youtube.com/vi/1/maxresdefault.jpg`}
                  alt={videoData.judul}
                  className="w-full h-full object-cover opacity-50"
                  onError={(e) => {
                    e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center gap-4">
                  <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-10 h-10 text-white ml-1" />
                  </div>
                  <p className="text-white text-lg font-semibold">Video belum dapat diputar</p>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  videoData.status === 'GRATIS' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-yellow-400 text-gray-900'
                }`}>
                  {videoData.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  videoData.jenjang === 'SD' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-purple-100 text-purple-700'
                }`}>
                  {videoData.jenjang}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-700">
                  {videoData.topikIPA}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {videoData.judul}
              </h1>



              {/* Button Buka Video */}
              <a
                href={videoData.linkVideo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold"
              >
                <ExternalLink className="w-5 h-5" />
                Buka Video di YouTube
              </a>
            </div>
          </div>

          {/* Tujuan Pembelajaran */}
          {videoData.tujuanPembelajaran && (
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-purple-600" />
                Tujuan Pembelajaran
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {videoData.tujuanPembelajaran}
              </p>
            </div>
          )}

          {/* Deskripsi */}
          {videoData.deskripsi && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-purple-600" />
                Deskripsi Video
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {videoData.deskripsi}
              </p>
            </div>
          )}

          {/* Info Banner */}
          <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
            <p className="text-sm text-gray-600 flex items-start gap-2">
              <span className="text-purple-600 font-semibold">💡 Info:</span>
              <span>Video ini merupakan sumber pembelajaran yang dapat membantu pemahaman materi IPA. Pastikan koneksi internet stabil untuk pengalaman terbaik.</span>
            </p>
          </div>
        </div>
      </div>
    );
}