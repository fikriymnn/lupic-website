"use client"
import { Play, ChevronLeft, X, Search, BookOpen, ChevronRight, ExternalLink, Target, FileText } from 'lucide-react';
import CustomFooter from "@/components/CustomFooter";
import Navbar from "@/components/Navbar";
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });


function getYouTubeVideoId(url) {
  try {
    // 1. Jika URL dalam bentuk youtu.be/xxxx
    let shortMatch = url.match(/youtu\.be\/([^?]+)/);
    if (shortMatch) return shortMatch[1];

    // 2. Jika URL dalam bentuk youtube.com/watch?v=xxxx
    let watchMatch = url.match(/v=([^&]+)/);
    if (watchMatch) return watchMatch[1];

    // 3. Jika URL dalam bentuk embed/xxxx
    let embedMatch = url.match(/embed\/([^?]+)/);
    if (embedMatch) return embedMatch[1];

    // 4. Jika URL Shorts (youtube.com/shorts/xxxx)
    let shortsMatch = url.match(/shorts\/([^?]+)/);
    if (shortsMatch) return shortsMatch[1];

    // 5. Jika URL punya parameter videoId
    let paramMatch = url.match(/videoId=([^&]+)/);
    if (paramMatch) return paramMatch[1];

    return null; // Tidak ketemu ID
  } catch (error) {
    return null;
  }
}

export default function DetailVideoTraining() {
  const { id } = useParams()
  const router = useRouter()
  const [videoData, setVideoData] = useState()
  const [access, setAccess] = useState(false)
  const [user, setUser] = useState()

  const getData = async () => {
    try {
      const resUser = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/public/user",
        { withCredentials: true })
      if (resUser.data) {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/video_pembelajaran/` + id)
        const resAccess = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/video_pembelajaran_access/` + id + "?userId=" + resUser.data._id)
        if (res.data || resAccess.data) {
          setUser(resUser.data)
          setAccess(resAccess.data[0])
          setVideoData(res.data)
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-16">
        <div className="max-w-5xl mx-auto px-4 py-8">
           <button
            onClick={() => { router.push("/video_training/")}}
            className="mb-6 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition flex items-center gap-2"
          >
            <ChevronLeft size={20} />
            Kembali
          </button>
          {/* Video Player Section */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
            <div className="relative pb-[56.25%] bg-gray-900">
              <div className="absolute inset-0 flex items-center justify-center">
                {
                  access?.status == "ACCESS" && videoData?.status == "BERBAYAR" ? <ReactPlayer url={videoData?.linkVideo} controls width="100%" height="100%" /> : <div>
                    <img
                      src={`https://img.youtube.com/vi/${getYouTubeVideoId(videoData?.linkVideo)}/maxresdefault.jpg`}
                      alt={videoData?.judul}
                      className="w-full h-full object-cover opacity-50"
                      onError={(e) => {
                        e.target.src = `https://img.youtube.com/vi/${getYouTubeVideoId(videoData?.linkVideo)}/hqdefault.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center gap-4">
                      <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Play className="w-10 h-10 text-white ml-1" />
                      </div>
                      <p className="text-white text-lg font-semibold">Video belum dapat diputar</p>
                    </div>
                  </div> 
                }
              </div>
            </div>

            {/* Video Info */}
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${videoData?.jenjang === 'SD'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-purple-100 text-purple-700'
                  }`}>
                  {videoData?.jenjang}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-700">
                  {videoData?.topikIPA}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${videoData?.status === 'GRATIS'
                  ? 'bg-green-500 text-white'
                  : 'bg-yellow-400 text-gray-900'
                  }`}>
                  {videoData?.status}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {videoData?.judul}
              </h1>
              {
                videoData?.status == "BERBAYAR" && access?.status == "ACCESS" ? "" : <button
                  onClick={() => { router.push('/video_training/access?videoId=' + videoData._id + "&userId=" + user?._id + "&judul=" + videoData.judul) }}
                  className="w-full px-4 py-2 bg-koreaBlueMuda text-white rounded-lg transition font-medium flex items-center justify-center gap-2"
                >
                  <BookOpen size={18} />
                  Buka Video
                </button>
              }
            </div>
          </div>

          {/* Tujuan Pembelajaran */}
          {videoData?.tujuanPembelajaran && (
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-koreaBlueMuda" />
                Tujuan Pembelajaran
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {videoData?.tujuanPembelajaran}
              </p>
            </div>
          )}

          {/* Deskripsi */}
          {videoData?.deskripsi && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-koreaBlueMuda" />
                Deskripsi Video
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {videoData?.deskripsi}
              </p>
            </div>
          )}

        </div>
      </div>
      <CustomFooter />
    </>
  );
}