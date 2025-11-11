"use client"
import Navbar from "@/components/Navbar";
import { useState } from 'react';
import { ChevronLeft, Send } from 'lucide-react';
import { useRouter } from "next/navigation";
import CustomFooter from "@/components/CustomFooter"

const useCase = {
    _id: '1',
    judulKasus: 'Penerapan Hukum Newton dalam Kehidupan Sehari-hari',
    deskripsi: 'Kasus tentang bagaimana guru menjelaskan konsep hukum Newton dengan pendekatan kontekstual',
    jenjang: 'SMP',
    topikIPA: 'Fisika',
    kompetensiGuru: 'Pedagogik',
    narasiLengkap: 'Seorang guru IPA SMP mengajarkan materi Hukum Newton dengan menggunakan berbagai contoh nyata dari kehidupan sehari-hari. Guru tersebut memulai pembelajaran dengan menanyakan pengalaman siswa saat naik sepeda, bermain bola, dan aktivitas lainnya. Kemudian guru menghubungkan pengalaman tersebut dengan konsep Hukum Newton I, II, dan III.',
    pertanyaanAnalisis: 
      'Metode apa yang dapat digunakan untuk mengukur efektivitas pembelajaran ini?',
    pembahasan: 'Pendekatan kontekstual sangat efektif karena menghubungkan materi dengan pengalaman nyata siswa. Guru dapat mengukur efektivitas melalui observasi partisipasi siswa, hasil evaluasi, dan kemampuan siswa menjelaskan konsep dengan kata-kata sendiri. Tantangan yang mungkin muncul adalah kebutuhan waktu lebih banyak dan persiapan yang matang.'
  }

export default function UseCaseDetail(){
    const router = useRouter();
  const [answers, setAnswers] = useState("");
  const [showPembahasan, setShowPembahasan] = useState(false);
  const [forumMessages, setForumMessages] = useState([
    { userId: 'user1', userName: 'Ibu Sarah', message: 'Kasus ini sangat menarik dan relevan dengan pengalaman saya di kelas', timestamp: new Date() }
  ]);
  const [newMessage, setNewMessage] = useState('');

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

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <button
          className="mb-6 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition flex items-center gap-2"
          onClick={()=>router.push("/case_study")}
        >
          <ChevronLeft size={20} />
          Kembali
        </button>

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
            {/* {useCase.pertanyaanAnalisis.map((pertanyaan, index) => (
              <div key={index} className="mb-4">
                <p className="text-gray-800 font-medium mb-2">{index + 1}. {pertanyaan}</p>
                <textarea
                  value={answers[index] || ''}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  placeholder="Tulis jawaban Anda di sini..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  rows="4"
                />
              </div>
            ))} */}
             <div className="mb-4">
                <p className="text-gray-800 font-medium mb-2">{useCase.pertanyaanAnalisis}</p>
                <textarea
                  value={answers || ''}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  placeholder="Tulis jawaban Anda di sini..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  rows="4"
                />
              </div>
            
            <button
              onClick={handleSubmitAnswer}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              Submit Jawaban
            </button>
          </div>

          {showPembahasan && (
            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6 rounded">
              <h2 className="text-xl font-semibold text-green-800 mb-3">Pembahasan</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {useCase.pembahasan}
              </p>
            </div>
          )}
        </div>

        {showPembahasan && (
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
        )}
      </div>
    </div>
    <CustomFooter/>
        </>
  );
};
