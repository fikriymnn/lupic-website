"use client";

import { useState, use, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { ChevronLeft, Send } from 'lucide-react';
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ModulAjarAccessAdmin({ params }) {
  const router = useRouter();
  const { id } = use(params);

  const [useCase, setUseCase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState("");
  const [showPembahasan, setShowPembahasan] = useState(false);
  const [forumMessages, setForumMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState({})


  // 🔥 FETCH DATA DETAIL STUDY CASE
  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/study_case/id/${id}`
        );
        const resUser = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/api/public/user",
          { withCredentials: true }
        );

        if (!res.ok) throw new Error("Gagal mengambil data");
        const data = await res.json();
        setUseCase(data);
        setAnswers(data.answer?.answer)
        if (data.answer?.answer) {
          console.log(data)
          setShowPembahasan(true)
        }
        setForumMessages(data.forums)

        // jika backend memiliki data forum
        if (data.forums) setForumMessages(data.forums);
        if (resUser.data) {
          console.log(resUser)
          setUser(resUser.data)
        }

      } catch (err) {
        console.error("Error fetch detail:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, [id]);

  const onSubmitForum = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/study_case_forum", { studyCaseId: useCase._id, userId: user._id, message: newMessage, name: "admin" }, { withCredentials: true })
      if (res.data) {
        window.location.href = "/lgndmn/dashboard/studycase/" + id
      }
    } catch (err) {
      console.log(err.message)
    }
  }


  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );

  if (!useCase)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600">Data tidak ditemukan</p>
      </div>
    );


  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="w-64 flex-shrink-0"></div>
      <div className="flex-1 p-6 lg:p-8">
        <div className="">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
              Teacher Study Case
            </h1>
          </div>
          <div className="">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
              {/* TAGS */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                  {useCase.jenjang}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                  {useCase.topikIPA}
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-semibold rounded-full">
                  {useCase.kompetensiGuru}
                </span>
              </div>

              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                {useCase.judulKasus}
              </h1>

              {/* NARASI */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Narasi Kasus</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {useCase.narasiLengkap}
                </p>
              </div>

              {/* PERTANYAAN */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Pertanyaan Analisis</h2>

                <p className="text-gray-800 mb-4">
                  {useCase.pertanyaanAnalisis}
                </p>
                <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6 rounded">
                  <h2 className="text-xl font-semibold text-green-800 mb-3">Pembahasan</h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {useCase.pembahasan}
                  </p>
                </div>
              </div>

            </div>


            {/* FORUM */}
        
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Forum Diskusi</h2>

                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {forumMessages.map((msg, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-indigo-600">
                          {msg.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(msg.createdAt).toLocaleTimeString("id-ID", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-gray-700">{msg.message}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Tulis pesan Anda..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={onSubmitForum}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>

  );
}
