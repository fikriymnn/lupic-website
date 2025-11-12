"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { ChevronLeft, Send } from 'lucide-react';

const useCase = {
  _id: '3',
  judulKasus: 'Integrasi Materi IPA: Siklus Air dan Perubahan Wujud',
  deskripsi: 'Pembelajaran IPA terpadu mengenai siklus air dengan konsep perubahan wujud zat',
  jenjang: 'SD',
  topikIPA: 'IPA Terpadu',
  kompetensiGuru: 'Pedagogik',
  narasiLengkap: 'Guru SD mengintegrasikan pembelajaran tentang siklus air dengan materi perubahan wujud zat. Melalui demonstrasi sederhana dan video animasi, siswa memahami bagaimana air menguap, mengembun, dan turun kembali sebagai hujan. Pembelajaran ini menggabungkan aspek fisika dan biologi.',
  pertanyaanAnalisis:
    'Apa keuntungan pembelajaran IPA terpadu untuk siswa SD?',
  pembahasan: 'Pembelajaran IPA terpadu membantu siswa melihat keterkaitan antar konsep sehingga lebih bermakna. Media seperti video animasi, demonstrasi langsung, dan model 3D sangat efektif untuk memvisualisasikan proses yang abstrak.'
}

export default function ModulAjarAccessAdmin() {
   const [answers, setAnswers] = useState("");
  const [showPembahasan, setShowPembahasan] = useState(false);
  const [forumMessages, setForumMessages] = useState([
    { userId: 'user1', userName: 'Ibu Sarah', message: 'Kasus ini sangat menarik dan relevan dengan pengalaman saya di kelas', timestamp: new Date() }
  ]);
    const [newMessage, setNewMessage] = useState('');
  const [data, setData] = useState([
    {
      _id: "1",
      modulAjar: "1",
      nama: "Ibu Sarah Wijaya",
      email: "sarah@email.com",
      no_whatsapp: "081234567890",
      provinsi: "Jawa Timur",
      jenjang_sekolah: "SMP",
      nama_instansi: "SMP Negeri 1 Surabaya",
      mata_pelajaran: "IPA",
      status_ppg: "PPG Calon Guru/PPG luar jabatan (Prajabatan)",
      sumber_informasi: "Media Sosial (Instagram, Facebook, TikTok, X, dll.)",
      status: "NO ACCESS",
      tanggal_pengisi: new Date("2024-11-01"),
      bukti_pembayaran: "/uploads/bukti-sarah.jpg",
    },
    {
      _id: "2",
      modulAjar: "2",
      nama: "Bapak Ardiansyah",
      email: "ardi@email.com",
      no_whatsapp: "089876543210",
      provinsi: "Jawa Barat",
      jenjang_sekolah: "SD",
      nama_instansi: "SDN 5 Bandung",
      mata_pelajaran: "IPA",
      status_ppg: "PPG Dalam Jabatan",
      sumber_informasi: "Rekan Guru",
      status: "ACCESS",
      tanggal_pengisi: new Date("2024-10-28"),
      bukti_pembayaran: "/uploads/bukti-ardi.jpg",
    },
  ]);

  const handleAnswerChange = (value) => {
    setAnswers(value);
  };

  const handleSubmitAnswer = () => {
    setShowPembahasan(true);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setForumMessages([...forumMessages, {
        userId: 'currentUser',
        userName: 'Anda',
        message: newMessage,
        timestamp: new Date()
      }]);
      setNewMessage('');
    }
  };

  // Toggle status ACCESS <-> NO ACCESS
  const toggleStatus = (id) => {
    setData((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, status: item.status === "ACCESS" ? "NO ACCESS" : "ACCESS" }
          : item
      )
    );
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-64 bg-gray-100"></div>
      <div className="w-full">
        <div className="m-auto w-full">
          <div className="min-h-screen p-4 w-[90%] mx-auto">
            <div className="max-w-7xl">
              {/* Header Section */}
              <div className="mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                  Teacher Study Case
                </h1>
              </div>
      <div className="max-w-4xl">

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
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

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Narasi Kasus</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {useCase.narasiLengkap}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Pertanyaan Analisis</h2>

              <div className="mb-4">
                <p className="text-gray-800 font-medium mb-2">{useCase.pertanyaanAnalisis}</p>
              </div>
          </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6 rounded">
              <h2 className="text-xl font-semibold text-green-800 mb-3">Pembahasan</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {useCase.pembahasan}
              </p>
            </div>
        </div>


          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Forum Diskusi</h2>
            
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {forumMessages.map((msg, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-indigo-600">{msg.userName}</span>
                    <span className="text-sm text-gray-500">
                      {msg.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
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
                onClick={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Tulis pesan Anda..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
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
      </div>
    </div>

  );
}
