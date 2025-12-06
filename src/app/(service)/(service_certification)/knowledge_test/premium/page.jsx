"use client"
import React, { useState, useEffect } from 'react';
import { Clock, X, CheckCircle, XCircle, AlertCircle, History, ArrowLeft } from 'lucide-react';
import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";
import axios from 'axios';


// Mock Data
const paket = [
  { id: '1', paket: 'Paket 1', deskripsi: 'Simulasi Intensif Premium', status: 'PREMIUM' },
  { id: '2', paket: 'Paket 2', deskripsi: 'Simulasi Intensif Premium', status: 'PREMIUM' },
  { id: '3', paket: 'Paket 3', deskripsi: 'Simulasi Intensif Premium', status: 'PREMIUM' }
];

// Mock questions dengan penjelasan
const questionsMock = {
  PCK: [
    {
      id: 'pck_1',
      kategori: 'PCK',
      soal: [
        { type: 'TEXT', value: 'Perhatikan gambar diagram pembelajaran di bawah ini:' },
        { type: 'IMAGE', value: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop' },
        { type: 'TEXT', value: 'Berdasarkan diagram di atas, apa yang dimaksud dengan pendekatan saintifik dalam pembelajaran?' }
      ],
      pilihan: [
        'Metode pembelajaran berbasis hafalan',
        'Pendekatan yang menekankan pada observasi, eksperimen, dan analisis',
        'Pembelajaran tanpa media',
        'Metode ceramah konvensional',
        'Pembelajaran berbasis proyek saja'
      ],
      jawaban: 'Pendekatan yang menekankan pada observasi, eksperimen, dan analisis',
      penjelasan: 'Pendekatan saintifik adalah metode pembelajaran yang menekankan pada proses ilmiah, dimana siswa diajak untuk mengamati, menanya, mengumpulkan informasi, mengasosiasi, dan mengkomunikasikan. Pendekatan ini mengutamakan observasi, eksperimen, dan analisis untuk membangun pemahaman konsep secara mendalam, bukan sekadar menghafal.'
    },
    {
      id: 'pck_2',
      kategori: 'PCK',
      soal: [
        { type: 'TEXT', value: 'Manakah strategi pembelajaran yang paling efektif untuk mengembangkan kemampuan berpikir kritis siswa?' }
      ],
      pilihan: [
        'Memberikan banyak latihan soal pilihan ganda',
        'Mendorong siswa untuk bertanya dan menganalisis masalah',
        'Menghafal konsep-konsep penting',
        'Memberikan ceramah yang detail',
        'Mengerjakan soal rutin setiap hari'
      ],
      jawaban: 'Mendorong siswa untuk bertanya dan menganalisis masalah',
      penjelasan: 'Kemampuan berpikir kritis dikembangkan melalui proses bertanya dan menganalisis. Dengan mendorong siswa untuk aktif bertanya dan menganalisis masalah, mereka akan terlatih untuk berpikir mendalam, mengevaluasi informasi, dan membuat kesimpulan berdasarkan bukti yang valid.'
    },
    ...Array.from({ length: 33 }, (_, i) => ({
      id: `pck_${i + 3}`,
      kategori: 'PCK',
      soal: [
        { type: 'TEXT', value: `Soal PCK ${i + 3}: Apa yang dimaksud dengan pembelajaran berbasis masalah?` }
      ],
      pilihan: [
        'Metode pembelajaran berbasis hafalan',
        'Pendekatan yang menekankan pada observasi, eksperimen, dan analisis',
        'Pembelajaran tanpa media',
        'Metode ceramah konvensional',
        'Pembelajaran berbasis proyek saja'
      ],
      jawaban: 'Pendekatan yang menekankan pada observasi, eksperimen, dan analisis',
      penjelasan: `Penjelasan untuk soal PCK ${i + 3}: Pembelajaran berbasis masalah (Problem-Based Learning) adalah metode pembelajaran yang menggunakan masalah nyata sebagai konteks bagi siswa untuk belajar tentang cara berpikir kritis dan keterampilan pemecahan masalah.`
    }))
  ],
  SJT: [
    {
      id: 'sjt_1',
      kategori: 'SJT',
      soal: [
        { type: 'IMAGE', value: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop' },
        { type: 'TEXT', value: 'Berdasarkan situasi pada gambar di atas, jika ada siswa yang tertidur di kelas seperti ini, apa yang akan Anda lakukan?' }
      ],
      pilihan: [
        'Membangunkan dengan keras',
        'Membiarkan saja',
        'Mendekati dengan lembut dan menanyakan kondisinya',
        'Menghukum di depan kelas',
        'Melaporkan langsung ke orang tua'
      ],
      jawaban: 'Mendekati dengan lembut dan menanyakan kondisinya',
      penjelasan: 'Sebagai guru profesional, penting untuk memahami kondisi siswa terlebih dahulu sebelum mengambil tindakan. Siswa yang tertidur mungkin memiliki masalah kesehatan, kelelahan, atau masalah pribadi. Pendekatan yang empatik dengan menanyakan kondisi siswa menunjukkan kepedulian guru dan membuka komunikasi untuk mencari solusi terbaik.'
    },
    {
      id: 'sjt_2',
      kategori: 'SJT',
      soal: [
        { type: 'TEXT', value: 'Seorang siswa sering terlambat masuk kelas. Sebagai guru, tindakan apa yang paling tepat?' }
      ],
      pilihan: [
        'Langsung memberikan hukuman',
        'Mencari tahu penyebab keterlambatan dan memberikan solusi',
        'Mengabaikan karena bukan masalah besar',
        'Mengurangi nilai kedisiplinan',
        'Memanggil orang tua setiap kali terlambat'
      ],
      jawaban: 'Mencari tahu penyebab keterlambatan dan memberikan solusi',
      penjelasan: 'Guru yang efektif harus mencari akar masalah sebelum memberikan sanksi. Keterlambatan bisa disebabkan oleh berbagai faktor seperti jarak tempuh, kondisi keluarga, atau masalah transportasi. Dengan mencari tahu penyebabnya, guru dapat memberikan solusi yang tepat dan membantu siswa untuk lebih disiplin.'
    },
    ...Array.from({ length: 28 }, (_, i) => ({
      id: `sjt_${i + 3}`,
      kategori: 'SJT',
      soal: [
        { type: 'TEXT', value: `Soal SJT ${i + 3}: Bagaimana cara terbaik menangani konflik antar siswa di kelas?` }
      ],
      pilihan: [
        'Membangunkan dengan keras',
        'Membiarkan saja',
        'Mendekati dengan lembut dan menanyakan kondisinya',
        'Menghukum di depan kelas',
        'Melaporkan langsung ke orang tua'
      ],
      jawaban: 'Mendekati dengan lembut dan menanyakan kondisinya',
      penjelasan: `Penjelasan untuk soal SJT ${i + 3}: Dalam menangani konflik, pendekatan yang tepat adalah dengan mendengarkan kedua belah pihak, memahami akar masalah, dan memfasilitasi dialog konstruktif antara siswa yang berkonflik untuk mencapai solusi yang adil.`
    }))
  ],
  RPC: [
    {
      id: 'rpc_1',
      kategori: 'RPC',
      soal: [
        { type: 'TEXT', value: 'Lihat ilustrasi pengelolaan kelas berikut:' },
        { type: 'IMAGE', value: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop' },
        { type: 'TEXT', value: 'Bagaimana cara mengelola kelas yang efektif berdasarkan ilustrasi tersebut?' }
      ],
      pilihan: [
        'Membuat aturan yang jelas dan konsisten',
        'Membiarkan siswa mengatur sendiri',
        'Menggunakan hukuman fisik',
        'Tidak perlu aturan khusus',
        'Hanya fokus pada siswa pintar'
      ],
      jawaban: 'Membuat aturan yang jelas dan konsisten',
      penjelasan: 'Pengelolaan kelas yang efektif memerlukan aturan yang jelas dan konsisten. Aturan yang jelas membantu siswa memahami ekspektasi, sementara konsistensi dalam penerapan aturan menciptakan lingkungan belajar yang terstruktur dan adil. Hal ini membantu mencegah miskomunikasi dan konflik di kelas.'
    },
    ...Array.from({ length: 19 }, (_, i) => ({
      id: `rpc_${i + 2}`,
      kategori: 'RPC',
      soal: [
        { type: 'TEXT', value: `Soal RPC ${i + 2}: Bagaimana membangun komunikasi efektif dengan orang tua siswa?` }
      ],
      pilihan: [
        'Membuat aturan yang jelas dan konsisten',
        'Membiarkan siswa mengatur sendiri',
        'Menggunakan hukuman fisik',
        'Tidak perlu aturan khusus',
        'Hanya fokus pada siswa pintar'
      ],
      jawaban: 'Membuat aturan yang jelas dan konsisten',
      penjelasan: `Penjelasan untuk soal RPC ${i + 2}: Komunikasi efektif dengan orang tua memerlukan keterbukaan, respek mutual, dan dialog yang konstruktif. Guru harus proaktif dalam memberikan informasi tentang perkembangan siswa dan terbuka terhadap masukan dari orang tua.`
    }))
  ]
};

// Mock user history dengan multiple attempts
const MOCK_USER_HISTORY = {
  userId: 'user123',
  attempts: [
    {
      id: 'attempt_1',
      paketId: '1',
      paket: 'Paket 1',
      nilai: {
        benar: 45,
        salah: 15,
        tidak_terjawab: 5,
        nilai: 69.23
      },
      jumlah_soal: 65,
      nama: 'John Doe',
      email: 'john@example.com',
      no_whatsapp: '08123456789',
      createdAt: new Date('2024-11-15T10:30:00').toISOString(),
      timeSpent: 5400 // 90 minutes
    },
    {
      id: 'attempt_2',
      paketId: '1',
      paket: 'Paket 1',
      nilai: {
        benar: 50,
        salah: 12,
        tidak_terjawab: 3,
        nilai: 76.92
      },

      jumlah_soal: 65,
      nama: 'John Doe',
      email: 'john@example.com',
      no_whatsapp: '08123456789',
      createdAt: new Date('2024-11-16T14:20:00').toISOString(),
      timeSpent: 4800
    },
    {
      id: 'attempt_3',
      paketId: '2',
      paket: 'Paket 2',
      nilai: {
        benar: 48,
        salah: 13,
        tidak_terjawab: 4,
        nilai: 73.85
      },
      jumlah_soal: 65,
      nama: 'John Doe',
      email: 'john@example.com',
      no_whatsapp: '08123456789',
      createdAt: new Date('2024-11-17T09:15:00').toISOString(),
      timeSpent: 5100
    }
  ]
};



// Shuffle function
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function TestSimulationApp() {
  const [page, setPage] = useState('paket-list'); // paket-list, start-test, test, result, history
  const [selectedPaket, setSelectedPaket] = useState(null);
  const [paket, setPaket] = useState([]);
  const [questions, setQuestions] = useState({});
  const [questionsNavigation, setQuestionsNavigation] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentCategory, setCurrentCategory] = useState('');
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(120 * 60);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [result, setResult] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [userHistory, setUserHistory] = useState(MOCK_USER_HISTORY);
  const [user, setUser] = useState({})

  const getPaket = async () => {
    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/paket")
      if (res.data) {
        const premiumPaket = res.data.filter(value => value.status == "PREMIUM")
        setPaket(premiumPaket)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const getUser = async () => {
    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/public/user", { withCredentials: true })
      if (res.data) {
        setUser(res.data)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const getSoal = async () => {
    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/soal/premium/" + selectedPaket?._id)
      if (res.data) {
        setQuestions
        setQuestions(res.data)
        setQuestionsNavigation(res.data)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    getUser()
    getPaket()
  }, [])

  useEffect(() => {
    getSoal()
    console.log(questionsMock)
  }, [selectedPaket])

  // Timer countdown
  useEffect(() => {
    if (page === 'test' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmitTest(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [page, timeLeft]);

  // Update current category
  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex >= 0) {
      const currentQ = questions[currentQuestionIndex];
      if (currentQ && currentQ.kategori !== currentCategory) {
        setCurrentCategory(currentQ.kategori);
      }
    }
  }, [currentQuestionIndex, questions]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectPaket = (paket) => {
    setSelectedPaket(paket);
    setPage('start-test');
  };

  const handleStartTest = () => {
    const allQuestions = [];
    const categories = Object.keys(questions);

    categories.forEach(category => {
      const categoryQuestions = shuffleArray(questions[category]).map(q => ({
        ...q,
        pilihan: shuffleArray(q.pilihan)
      }));

      allQuestions.push(...categoryQuestions);
    });

    setQuestions(allQuestions);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setCurrentCategory(allQuestions[0]?.kategori || '');
    setTimeLeft(120 * 60);
    setStartTime(Date.now());
    setPage('test');
  };

  const handleAnswerSelect = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer
    }));
  };

  const handleNavigateQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleSubmitTest = async (autoSubmit = false) => {
    if (!autoSubmit) {
      setShowSubmitConfirm(true);
      return;
    }

    const endTime = Date.now();
    const timeSpent = Math.floor((endTime - startTime) / 1000);

    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    questions.forEach((question, index) => {
      const userAnswer = answers[index];
      if (!userAnswer) {
        unanswered++;
      } else if (userAnswer === question.jawaban) {
        correct++;
      } else {
        incorrect++;
      }
    });

    const percentage = ((correct / questions.length) * 100).toFixed(2);

    const resultData = {
      nilai: {
        benar: correct,
        salah: incorrect,
        tidak_terjawab: unanswered,
        nilai: parseFloat(percentage)
      },
      jumlah_soal: questions.length,
      paketId: selectedPaket._id,
      paket: selectedPaket.paket,
      userId: user._id,
      nama: user.nama,
      email: user.email,
      no_whatsapp: user.no_wa,
      timeSpent,
      details: questions.map((question, index) => ({
        ...question,
        userAnswer: answers[index] || null
      })),
      createdAt: new Date().toISOString()
    };

    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/nilai", resultData)
      if (res.data) {
        setResult(resultData);
        setShowSubmitConfirm(false);
        setPage('result');

        // Add to history
        setUserHistory(prev => ({
          ...prev,
          attempts: [resultData, ...prev.attempts]
        }));
      }
    } catch (err) {
      alert(err.message)
      console.log(err.message)
    }
  };

  const handleViewHistoryResult = (attempt) => {
    setResult(attempt);
    setSelectedPaket(paket.find(p => p._id === attempt.paketId));
    setPage('result');
  };

  const getQuestionStatus = (index) => {
    return answers[index] ? 'answered' : 'unanswered';
  };

  const currentQuestion = questions[currentQuestionIndex];

  const getQuestionNumberInCategory = () => {
    if (!currentQuestion) return 0;
    const categoryQuestions = questions.filter(q => q.kategori === currentQuestion.kategori);
    const indexInCategory = categoryQuestions.findIndex(q => q._id === currentQuestion._id);
    return indexInCategory + 1;
  };

  const getTotalQuestionsInCategory = () => {
    if (!currentQuestion) return 0;
    return questions.filter(q => q.kategori === currentQuestion.kategori).length;
  };

  function formatMultilineString(str) {
    if (!str) return "";

    return str
      .replace(/\\n/g, "\n")   // ubah "\n" literal menjadi newline asli
      .replace(/\\t/g, "    ") // ubah "\t" literal menjadi 4 spasi
      .trim();
  }

  const renderQuestionContent = (soalArray) => {
    return soalArray.map((item, index) => {
      if (item.type === 'TEXT') {
        return (
          <pre key={index}
            style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}
            className="text-lg text-gray-800 mb-4 leading-relaxed"
          >
            {formatMultilineString(item?.value)}
          </pre>
        );
      } else if (item.type === 'IMAGE') {
        return (
          <div key={index} className="mb-4">
            <img
              src={`${process.env.NEXT_PUBLIC_API_FILE_URL}${item.value}`}
              alt={`Soal ${currentQuestionIndex + 1}`}
              className="max-w-96 h-auto rounded-lg shadow-md"
            />
          </div>
        );
      }
      return null;
    });
  };

  // Paket List Page
  if (page === 'paket-list') {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 p-8 pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-8">
            <div className="max-w-6xl mx-auto md:block grid grid-cols-1 justify-items-center md:justify-items-start mb-8">
              <h1 className="md:text-4xl text-4xl font-bold">
                Latihan Tes Objektif
              </h1>
              <div className="h-1 w-36 bg-koreaRed md:mt-3 mt-2"></div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {paket.map(paket => {
                const paketAttempts = userHistory.attempts.filter(a => a.paketId === paket._id);
                const hasAttempts = paketAttempts.length > 0;
                const bestScore = hasAttempts ? Math.max(...paketAttempts.map(a => a.nilai.nilai)) : 0;

                return (
                  <div key={paket._id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-800">{paket.paket}</h3>
                      <div className="flex flex-col gap-2">
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{paket.deskripsi}</p>
                    <button
                      onClick={() => handleSelectPaket(paket)}
                      className="w-full py-3 rounded-lg font-semibold transition-colors bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      Mulai Paket
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <CustomFooter />
      </>
    );
  }

  // History Page
  if (page === 'history') {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setPage('paket-list')}
                className="p-2 hover:bg-white rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
              <h1 className="text-4xl font-bold text-gray-800">
                History Pengerjaan Tes
              </h1>
            </div>

            {userHistory.attempts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600">Belum ada riwayat pengerjaan</p>
                <button
                  onClick={() => setPage('paket-list')}
                  className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
                >
                  Mulai Tes Sekarang
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {userHistory.attempts.map((attempt, index) => (
                  <div key={attempt._id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-gray-800">{attempt.paket}</h3>
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                            Percobaan #{userHistory.attempts.length - index}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          {new Date(attempt.createdAt).toLocaleString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Benar</p>
                            <p className="text-xl font-bold text-green-600">{attempt.nilai.benar}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Salah</p>
                            <p className="text-xl font-bold text-red-600">{attempt.nilai.salah}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Tidak Dijawab</p>
                            <p className="text-xl font-bold text-gray-600">{attempt.nilai.tidak_terjawab}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Waktu</p>
                            <p className="text-xl font-bold text-blue-600">{formatTime(attempt.timeSpent)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Nilai</p>
                            <p className="text-3xl font-bold text-indigo-600">{attempt.nilai.nilai.toFixed(2)}%</p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleViewHistoryResult(attempt)}
                        className="ml-4 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                      >
                        Lihat Detail
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <CustomFooter />
      </>
    );
  }

  // Start Test Page
  if (page === 'start-test') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-lg shadow-2xl p-12 max-w-md w-full text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedPaket.paket}</h2>
          <p className="text-gray-600 mb-8">{selectedPaket.deskripsi}</p>
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-700 mb-2">Informasi Tes:</p>
            <p className="text-lg font-semibold text-gray-800">
              {Object.values(questions).reduce((sum, arr) => sum + arr.length, 0)} Soal
            </p>
            <p className="text-lg font-semibold text-gray-800">Waktu: 120 Menit</p>
            <div className="mt-4 text-left">
              <p className="text-sm text-gray-700 mb-2">Kategori Soal:</p>
              {Object.keys(questions).map(category => (
                <p key={category} className="text-sm text-gray-600">
                  • {category}: {questions[category].length} soal
                </p>
              ))}
            </div>
          </div>
          <p className="text-gray-600 mb-8">
            Klik tombol "Start" untuk memulai tes
          </p>
          <button
            onClick={handleStartTest}
            className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors"
          >
            Start Test
          </button>
          <button
            onClick={() => setPage('paket-list')}
            className="w-full mt-4 text-gray-600 hover:text-gray-800"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  // Test Page
  if (page === 'test') {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <div className="w-80 bg-white shadow-lg p-6 overflow-y-auto">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Navigasi Soal</h3>

          <div className="mb-4 p-3 bg-indigo-100 rounded-lg">
            <p className="text-sm text-gray-700">Sedang Mengerjakan:</p>
            <p className="text-lg font-bold text-indigo-700">{currentCategory}</p>
            <p className="text-xs text-gray-600">
              Soal {getQuestionNumberInCategory()} dari {getTotalQuestionsInCategory()}
            </p>
          </div>

          {Object.keys(questionsNavigation).map((category) => {
            const categoryQuestions = questions
              .map((q, idx) => ({ q, idx }))
              .filter(({ q }) => q.kategori === category);
            console.log(questions)

            return (
              <div key={category} className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-2 border-b pb-2">
                  {category} ({categoryQuestions.length} soal)
                </h4>
                <div className="grid grid-cols-5 gap-2">
                  {categoryQuestions.map(({ q, idx }) => (
                    <button
                      key={idx}
                      onClick={() => handleNavigateQuestion(idx)}
                      className={`w-12 h-12 rounded-lg font-semibold text-sm transition-all ${currentQuestionIndex === idx
                        ? 'ring-2 ring-indigo-600'
                        : ''
                        } ${getQuestionStatus(idx) === 'answered'
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                        }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex-1 flex flex-col">
          <div className="bg-white shadow-md p-6 flex justify-between items-center">
            <div className="text-lg font-semibold text-gray-800">
              <span className="text-2xl font-bold text-indigo-600">
                Soal {currentQuestionIndex + 1}
              </span>
              <span className="text-gray-500"> / {questions.length}</span>
              <div className="mt-1">
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                  {currentQuestion?.kategori} - Soal {getQuestionNumberInCategory()}/{getTotalQuestionsInCategory()}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-lg font-bold text-red-600">
              <Clock className="w-6 h-6" />
              {formatTime(timeLeft)}
            </div>
          </div>

          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                {currentQuestion?.soal && renderQuestionContent(currentQuestion.soal)}

                <div className="space-y-3 mt-6">
                  {currentQuestion?.pilihan.filter(item => item !== "").map((option, idx) => {
                     

                    const optionLetter = String.fromCharCode(65 + idx);
                    const isSelected = answers[currentQuestionIndex] === option;

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswerSelect(option)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${isSelected
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
                          }`}
                      >
                        <span className="font-semibold text-indigo-600 mr-3">
                          {optionLetter}.
                        </span>
                        <span className="text-gray-800">{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md p-6">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              <button
                onClick={() => handleNavigateQuestion(Math.max(0, currentQuestionIndex - 1))}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <button
                onClick={() => setShowSubmitConfirm(true)}
                className="px-8 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700"
              >
                Submit Test
              </button>

              <button
                onClick={() => handleNavigateQuestion(Math.min(questions.length - 1, currentQuestionIndex + 1))}
                disabled={currentQuestionIndex === questions.length - 1}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {showSubmitConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Konfirmasi Pengiriman
              </h3>
              <p className="text-gray-600 mb-6">
                Apakah Anda yakin ingin mengakhiri tes? Pastikan semua jawaban sudah terisi.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowSubmitConfirm(false)}
                  className="flex-1 px-6 py-3 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  onClick={() => handleSubmitTest(true)}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
                >
                  Ya, Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Result Page
  if (page === 'result') {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Hasil Pengerjaan Tes</h1>
            <button
              onClick={() => {
                setPage('paket-list');
                setResult(null);
                setQuestions([]);
                setSelectedPaket({})
                setAnswers({});
              }}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-8 h-8 text-gray-600" />
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{result.paket}</h2>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p><span className="font-semibold">Nama:</span> {result.nama}</p>
                <p><span className="font-semibold">Email:</span> {result.email}</p>
              </div>
              <div>
                <p><span className="font-semibold">No. WhatsApp:</span> {result.no_whatsapp}</p>
                <p><span className="font-semibold">Tanggal:</span> {new Date(result.createdAt).toLocaleString('id-ID')}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Ringkasan</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-green-600">{result.nilai.benar}</p>
                <p className="text-gray-600">Benar</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <XCircle className="w-12 h-12 text-red-500" />
                </div>
                <p className="text-3xl font-bold text-red-600">{result.nilai.salah}</p>
                <p className="text-gray-600">Salah</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <AlertCircle className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-3xl font-bold text-gray-600">{result.nilai.tidak_terjawab}</p>
                <p className="text-gray-600">Tidak Dijawab</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Clock className="w-12 h-12 text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-blue-600">
                  {result.timeSpent ? formatTime(result.timeSpent) : '-'}
                </p>
                <p className="text-gray-600">Waktu</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-indigo-600 mb-2">{result.nilai.nilai}%</div>
                <p className="text-gray-600">Persentase</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t">
              <p className="text-center text-gray-700">
                <span className="font-semibold">Total Soal:</span> {result.jumlah_soal}
              </p>
            </div>
          </div>

          {result.details && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Ulasan Soal dan Kunci Jawaban</h2>
              <div className="space-y-6">
                {result.details.map((question, index) => {
                  const isCorrect = question.userAnswer === question.jawaban;
                  const isUnanswered = !question.userAnswer;

                  return (
                    <div key={index} className={`border-l-4 p-6 rounded-r-lg ${isCorrect ? 'border-green-500 bg-green-50' :
                      isUnanswered ? 'border-gray-400 bg-gray-50' :
                        'border-red-500 bg-red-50'
                      }`}>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                          Soal {index + 1} ({question.kategori})
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${isCorrect ? 'bg-green-500 text-white' :
                          isUnanswered ? 'bg-gray-400 text-white' :
                            'bg-red-500 text-white'
                          }`}>
                          {isCorrect ? 'Benar' : isUnanswered ? 'Tidak Dijawab' : 'Salah'}
                        </span>
                      </div>

                      <div className="mb-4">
                        {question.soal.map((item, idx) => {
                          if (item.type === 'TEXT') {
                            return (
                              <pre key={idx}
                                style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}
                                className="text-gray-700 mb-2"
                              >
                                {formatMultilineString(item?.value)}
                              </pre>
                            );
                          } else if (item.type === 'IMAGE') {
                            return (
                              <div key={idx} className="mb-2">
                                <img
                                  src={`${process.env.NEXT_PUBLIC_API_FILE_URL}${item.value}`}
                                  alt={`Soal ${index + 1}`}
                                  className="max-w-md h-auto rounded-lg shadow-md"
                                />
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>

                      <div className="space-y-2 mb-4">
                        {question.pilihan?.filter(item => item !== "").map((option, idx) => {
            
                          const optionLetter = String.fromCharCode(65 + idx);
                          const isUserAnswer = question.userAnswer === option;
                          const isCorrectAnswer = question.jawaban === option;

                          return (
                            <div
                              key={idx}
                              className={`p-3 rounded-lg ${isCorrectAnswer ? 'bg-green-200 border-2 border-green-500' :
                                isUserAnswer && !isCorrect ? 'bg-red-200 border-2 border-red-500' :
                                  'bg-white border border-gray-300'
                                }`}
                            >
                              <span className="font-semibold mr-2">{optionLetter}.</span>
                              <span>{option}</span>
                              {isCorrectAnswer && (
                                <span className="ml-2 text-green-700 font-semibold">(Kunci Jawaban)</span>
                              )}
                              {isUserAnswer && !isCorrect && (
                                <span className="ml-2 text-red-700 font-semibold">(Jawaban Anda)</span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Penjelasan */}
                      {question.penjelasan && (
                        <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                          <p className="font-semibold text-blue-900 mb-2">📚 Penjelasan:</p>
                          <p className="text-gray-700 leading-relaxed">{question.penjelasan}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}