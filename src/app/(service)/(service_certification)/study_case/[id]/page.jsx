"use client";

import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { ChevronLeft, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import CustomFooter from "@/components/CustomFooter";
import { use } from "react";
import axios from "axios";

const formatted = (iso) => {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso))
}

export default function UseCaseDetail({ params }) {
  const router = useRouter();
  const { id } = use(params);

  const [useCase, setUseCase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState("");
  const [newAnswers, setNewAnswers] = useState("");
  const [showPembahasan, setShowPembahasan] = useState(false);
  const [forumMessages, setForumMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState({})


  // 🔥 FETCH DATA DETAIL STUDY CASE
  useEffect(() => {
    async function fetchDetail() {
      try {
        const resUser = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/api/public/user",
          { withCredentials: true }
        );
        console.log("fetch1")

        if (resUser.data) {
          console.log("fetch2")
          const data = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/study_case/id/${id}?userId=${resUser.data._id}`)
          setUser(resUser.data)
          setUseCase(data.data);
          console.log("fetch3")
          setAnswers(data.data?.answer?.answer)
          setForumMessages(data.data.forums)
          if (data.data) {
            console.log("fetch4")
          }
          console.log(data.data)
          if (data.data.answer?.answer) {

            setShowPembahasan(true)
          }
        }

      } catch (err) {
        console.error("Error fetch detail:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, [id]);

  const onSubmitAnswer = async () => {
    try {
      await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/study_case_answer", { studyCaseId: useCase._id, userId: user._id, answer: answers }, { withCredentials: true })
    } catch (err) {
      console.log(err.message)
    }
  }

  const onSubmitForum = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/study_case_forum", { studyCaseId: useCase._id, userId: user._id, message: newMessage, name: user.nama }, { withCredentials: true })
      if (res.data) {
        window.location.href = "/study_case/" + id
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
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <button
            className="mb-6 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition flex items-center gap-2"
            onClick={() => router.push("/study_case")}
          >
            <ChevronLeft size={20} />
            Kembali
          </button>

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

            <h1 className="text-3xl font-bold text-gray-800 mb-4">
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

              <p className="text-gray-800 font-medium mb-2">
                {useCase.pertanyaanAnalisis}
              </p>
              <textarea
                value={answers ? answers : newAnswers}
                onChange={(e) => setNewAnswers(e.target.value)}
                placeholder="Tulis jawaban Anda di sini..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none"
                rows="4"
              />
              {
                !answers && <button
                  onClick={() => {
                    onSubmitAnswer()
                    setShowPembahasan(true)
                  }}
                  className="mt-3 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                >
                  Submit Jawaban
                </button>
              }



            </div>

            {/* PEMBAHASAN */}
            {showPembahasan && (
              <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6 rounded">
                <h2 className="text-xl font-semibold text-green-800 mb-3">
                  Pembahasan
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {useCase.pembahasan}
                </p>
              </div>
            )}
          </div>

          {/* FORUM */}
          {showPembahasan && (
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
          )}
        </div>
      </div>

      <CustomFooter />
    </>
  );
}
