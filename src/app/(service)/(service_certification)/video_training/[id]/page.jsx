"use client"
import { Play, Filter, X, Search, BookOpen, ChevronRight, ExternalLink, Target, FileText } from 'lucide-react';
import CustomFooter from "@/components/CustomFooter";
import Navbar from "@/components/Navbar";
import { useRouter } from 'next/navigation';

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


export default function DetailVideoTraining() {
  const router = useRouter()
  const handleBackToList = () => {
  };
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20">
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
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${videoData.status === 'GRATIS'
                    ? 'bg-green-500 text-white'
                    : 'bg-yellow-400 text-gray-900'
                  }`}>
                  {videoData.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${videoData.jenjang === 'SD'
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

              <button
                onClick={() => {router.push('/video_training/access') }}
                className="w-full px-4 py-2 bg-koreaBlueMuda text-white rounded-lg transition font-medium flex items-center justify-center gap-2"
              >
                <BookOpen size={18} />
                Buka Video
              </button>

            </div>
          </div>

          {/* Tujuan Pembelajaran */}
          {videoData.tujuanPembelajaran && (
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-koreaBlueMuda" />
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
                <FileText className="w-6 h-6 text-koreaBlueMuda" />
                Deskripsi Video
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {videoData.deskripsi}
              </p>
            </div>
          )}

        </div>
      </div>
      <CustomFooter />
    </>
  );
}