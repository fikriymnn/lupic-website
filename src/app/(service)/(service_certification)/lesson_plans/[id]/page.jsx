"use client"
import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";
import { Download, BookOpen, ChevronLeft, Sparkles, Clock, CheckCircle } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

export default function ModulAjarDetail() {
  const router = useRouter()
  const { id } = useParams()
  // Data contoh - nanti diganti dengan data dari API
  const [modul, setModul] = useState({
    judulModul: "",
    cover: "",
    deskripsi: "",
    jenjang: "",
    topikIPA: "",
    tujuanPembelajaran: "",
    status: "",
    file: "",
    createdAt: ""
  });
  const [access, setAccess] = useState(false)

  const [downloading, setDownloading] = useState(false);
  const [user, setUser] = useState({})

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

  const getData = async () => {
    try {
      const resUser = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/api/public/user",
        { withCredentials: true }
      );
      if (resUser.data) {
        const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/modul_ajar/id/" + id)
        const resAccess = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/modul_ajar_access/" + id + "?userId=" + resUser.data._id)
        if (resAccess) {
          setUser(resUser.data)
          setModul(res.data)
          setAccess(resAccess.data[0]?.status)
          console.log(resAccess.data[0]?.status)
          console.log(res.data)
        }
      }
    } catch (err) {
      console.log(err.message)
    }
  }
  useEffect(() => {
    getData()

  }, [])

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
           <button
            onClick={() => { router.push("/lesson_plans") }}
            className="mb-6 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition flex items-center gap-2"
          >
            <ChevronLeft size={20} />
            Kembali
          </button>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Kolom Kiri - Cover & Download */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden top-8">
                {/* Cover Image */}
                <div className="relative h-64 bg-gradient-to-br from-blue-400 to-purple-500">
                  {modul?.cover ? (
                    <img
                      src={modul.cover ? `${process.env.NEXT_PUBLIC_API_FILE_URL}${modul.cover}` : ""}
                      alt={modul.judulModul}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <BookOpen className="w-24 h-24 text-white opacity-50" />
                    </div>
                  )}
                  {/* Status Badge */}

                </div>

                {/* Download Section */}
                <div className="p-6">
                  {
                    access=="NO ACCESS"&&modul.status=="BERBAYAR"?<button
                    onClick={() => {
                      if (access == "ACCESS") {
                        window.location.href = `${process.env.NEXT_PUBLIC_API_FILE_URL}${modul.file}`
                      } else {
                        router.push("/lesson_plans/access?modulId=" + id + "&userId=" + user._id + "&modulName=" + modul.judulModul)
                      }
                    }}
                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium flex items-center justify-center gap-2"
                  >
                    <BookOpen size={18} />
                    Buka Modul
                  </button>:<button
                      onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_API_FILE_URL}${modul.file}`}
                      className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition font-medium flex items-center justify-center gap-2"
                    >
                      <Download size={18} />
                      Unduh PDF
                    </button> 
                  }
                  
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
                  <span className={`px-3 py-2 rounded-full text-sm font-semibold bg-blue-100 text-blue-700`}>
                    {modul?.jenjang}
                  </span>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-700`}>
                    {modul?.topikIPA}
                  </span>
                  <span className={`px-3 py-2 rounded-full text-sm font-bold ${modul?.status === 'GRATIS'
                    ? 'bg-green-500 text-white'
                    : 'bg-yellow-400 text-gray-900'
                    }`}>
                    {modul?.status}
                  </span>
                </div>

                {/* Deskripsi */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Deskripsi Modul</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {modul?.deskripsi}
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
                  <div className="flex gap-3">
                    <p className="text-gray-700 leading-relaxed flex-1 pt-0.5">
                      {modul?.tujuanPembelajaran}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomFooter />
    </>
  );
}