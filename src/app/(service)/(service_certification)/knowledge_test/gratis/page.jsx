"use client"
import React, { useState, useEffect } from 'react';
import { Clock, X, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Mock questions untuk trial test dengan format soal baru (TEXT dan IMAGE)
const questions = {
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
      jawaban: 'Pendekatan yang menekankan pada observasi, eksperimen, dan analisis'
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
      jawaban: 'Mendorong siswa untuk bertanya dan menganalisis masalah'
    },
    ...Array.from({ length: 8 }, (_, i) => ({
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
      jawaban: 'Pendekatan yang menekankan pada observasi, eksperimen, dan analisis'
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
      jawaban: 'Mendekati dengan lembut dan menanyakan kondisinya'
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
      jawaban: 'Mencari tahu penyebab keterlambatan dan memberikan solusi'
    },
    ...Array.from({ length: 8 }, (_, i) => ({
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
      jawaban: 'Mendekati dengan lembut dan menanyakan kondisinya'
    }))
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

export default function TrialTestApp() {
  const router = useRouter()
  const [page, setPage] = useState('start-test');
  const [questions, setQuestions] = useState([]);
  const [questionsNavigation, setQuestionsNavigation] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentCategory, setCurrentCategory] = useState('');
  const [answers, setAnswers] = useState({});
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [result, setResult] = useState(null);
  const [startTime, setStartTime] = useState(null);

   function formatMultilineString(str) {
    if (!str) return "";

    return str
      .replace(/\\n/g, "\n")   // ubah "\n" literal menjadi newline asli
      .replace(/\\t/g, "    ") // ubah "\t" literal menjadi 4 spasi
      .trim();
  }

  const getData = async () => {
    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/soal/gratis")
      if (res.data) {
        setQuestions(res.data)
        setQuestionsNavigation(res.data)
      }
    } catch (err) {
      console.log(err.message)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  // Timer count up (tidak terbatas)
  useEffect(() => {
    if (page === 'test') {
      const timer = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [page]);

  // Update current category based on question index
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
    setElapsedTime(0);
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

  const handleSubmitTest = (autoSubmit = false) => {
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
      correct,
      incorrect,
      unanswered,
      timeSpent,
      percentage,
      totalQuestions: questions.length,
      details: questions.map((question, index) => ({
        ...question,
        userAnswer: answers[index] || null
      }))
    };

    setResult(resultData);
    setShowSubmitConfirm(false);
    setPage('result');
  };

  const getQuestionStatus = (index) => {
    return answers[index] ? 'answered' : 'unanswered';
  };

  const currentQuestion = questions[currentQuestionIndex];

  const getQuestionNumberInCategory = () => {
    if (!currentQuestion) return 0;
    const categoryQuestions = questions.filter(q => q.kategori === currentQuestion.kategori);
    const indexInCategory = categoryQuestions.findIndex(q => q.id === currentQuestion.id);
    return indexInCategory + 1;
  };

  const getTotalQuestionsInCategory = () => {
    if (!currentQuestion) return 0;
    return questions.filter(q => q.kategori === currentQuestion.kategori).length;
  };

  // Render question content (TEXT or IMAGE)
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
              className="w-80 h-auto rounded-lg shadow-md"
            />
          </div>
        );
      }
      return null;
    });
  };

  

  // Start Test Page
  if (page === 'start-test') {
    const totalQuestions = Object.values(questions).reduce((sum, arr) => sum + arr.length, 0);

    return (
      <>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
          <div className="bg-white rounded-lg shadow-2xl p-12 max-w-md w-full text-center">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-green-500 text-white rounded-full font-bold text-sm">
                UJI COBA GRATIS
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Trial Test</h2>
            <p className="text-gray-600 mb-8">Tes percobaan untuk mengenal sistem dan format soal</p>

            <div className="bg-green-50 rounded-lg p-6 mb-8">
              <p className="text-sm text-gray-700 mb-2">Informasi Tes:</p>
              <p className="text-lg font-semibold text-gray-800">
                {totalQuestions} Soal
              </p>
              <p className="text-lg font-semibold text-green-600">Waktu: Tidak Terbatas</p>
              <div className="mt-4 text-left">
                <p className="text-sm text-gray-700 mb-2">Kategori Soal:</p>
                {Object.keys(questions).map(category => (
                  <p key={category} className="text-sm text-gray-600">
                    • {category}: {questions[category].length} soal
                  </p>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 text-left">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Catatan:</span> Ini adalah tes percobaan gratis tanpa batasan waktu.
                Hasil tidak disimpan dan hanya untuk latihan.
              </p>
            </div>

            <p className="text-gray-600 mb-8">
              Klik tombol "Start" untuk memulai tes
            </p>
            <button
              onClick={handleStartTest}
              className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors shadow-lg"
            >
              Start Test
            </button>
          </div>
        </div>
      </>
    );
  }

  // Test Page
  if (page === 'test') {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Left Panel - Navigation */}
        <div className="w-80 bg-white shadow-lg p-6 overflow-y-auto">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-green-500 text-white rounded-full text-xs font-bold">
              TRIAL TEST
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Navigasi Soal</h3>

          {/* Category indicator */}
          <div className="mb-4 p-3 bg-green-100 rounded-lg">
            <p className="text-sm text-gray-700">Sedang Mengerjakan:</p>
            <p className="text-lg font-bold text-green-700">{currentCategory}</p>
            <p className="text-xs text-gray-600">
              Soal {getQuestionNumberInCategory()} dari {getTotalQuestionsInCategory()}
            </p>
          </div>

          {/* Question grid grouped by category */}
          {Object.keys(questionsNavigation).map((category) => {
            const categoryQuestions = questions
              .map((q, idx) => ({ q, idx }))
              .filter(({ q }) => q.kategori === category);

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
                        ? 'ring-2 ring-green-600'
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

        {/* Right Panel - Question */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white shadow-md p-6 flex justify-between items-center">
            <div className="text-lg font-semibold text-gray-800">
              <span className="text-2xl font-bold text-green-600">
                Soal {currentQuestionIndex + 1}
              </span>
              <span className="text-gray-500"> / {questions.length}</span>
              <div className="mt-1">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  {currentQuestion?.kategori} - Soal {getQuestionNumberInCategory()}/{getTotalQuestionsInCategory()}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-lg font-bold text-blue-600">
              <Clock className="w-6 h-6" />
              {formatTime(elapsedTime)}
            </div>
          </div>

          {/* Question Body */}
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                {/* Render question content (TEXT and/or IMAGE) */}
                {currentQuestion?.soal && renderQuestionContent(currentQuestion.soal)}

                {/* Options */}
                <div className="space-y-3 mt-6">
                  {currentQuestion?.pilihan.filter(item => item !== "").map((option, idx) => {
                    if (!option.trim()) return null; // skip kalau kosong

                    const optionLetter = String.fromCharCode(65 + idx);
                    const isSelected = answers[currentQuestionIndex] === option;

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswerSelect(option)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${isSelected
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-300 hover:border-green-400 hover:bg-gray-50'
                          }`}
                      >
                        <span className="font-semibold text-green-600 mr-3">
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

          {/* Footer */}
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
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Submit Confirmation Modal */}
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
          {/* Header with Close Button */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Hasil Trial Test</h1>
              <span className="inline-block mt-2 px-3 py-1 bg-green-500 text-white rounded-full text-sm font-bold">
                UJI COBA GRATIS
              </span>
            </div>
            <button
              onClick={() => {
                router.push("/knowledge_test")
              }}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-8 h-8 text-gray-600" />
            </button>
          </div>

          {/* Note */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Catatan:</span> Hasil trial test ini tidak disimpan.
              Untuk mendapatkan hasil yang tersimpan dan akses ke soal lebih lengkap, gunakan paket premium.
            </p>
          </div>

          {/* Statistics Table */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Ringkasan</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-green-600">{result.correct}</p>
                <p className="text-gray-600">Benar</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <XCircle className="w-12 h-12 text-red-500" />
                </div>
                <p className="text-3xl font-bold text-red-600">{result.incorrect}</p>
                <p className="text-gray-600">Salah</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <AlertCircle className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-3xl font-bold text-gray-600">{result.unanswered}</p>
                <p className="text-gray-600">Tidak Dijawab</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Clock className="w-12 h-12 text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-blue-600">
                  {formatTime(result.timeSpent)}
                </p>
                <p className="text-gray-600">Waktu Pengerjaan</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-green-600 mb-2">{result.percentage}%</div>
                <p className="text-gray-600">Persentase</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t">
              <p className="text-center text-gray-700">
                <span className="font-semibold">Total Soal:</span> {result.totalQuestions}
              </p>
            </div>
          </div>

          {/* Question Review */}
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

                    {/* Render question content */}
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
                                className="w-56 h-auto rounded-lg shadow-md"
                              />
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>

                    <div className="space-y-2">
                      {question.pilihan.filter(item => item !== "").map((option, idx) => {
                       

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

          {/* Action Button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                router.push("/knowledge_test")
              }}
              className="px-8 py-4 bg-green-600 text-white rounded-lg font-bold text-lg hover:bg-green-700 transition-colors shadow-lg"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}