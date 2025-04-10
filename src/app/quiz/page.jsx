"use client";
import React, { useState, useEffect } from "react";

const quizQuestions = [
{
    question: "Tabel berikut menunjukkan jumlah proton, neutron, dan electron dalam 4 partikel yang berbeda, W, X, Y, dan Z",
    img:"/soal/no2.png",
    options: ["W dan Y", "W dan Z", "X dan Y", "X dan Z"],
    answer: ["W dan Y"],
  },
  {
    question: "Letak Zn2+ dalam tabel periodik adalah…. (diketahui nomor nomor atom Zn=30)",
    options: ["Golongan 10, periode 4", "Golongan 11, periode 4", "Golongan 12, periode 4", "Golongan 14, periode 4"],
    answer: ["Golongan 12, periode 4"],
  },
  {
    question: "Untuk senyawa N2, O2, F2, pernyataan manakah yang benar?",
    options: ["Energi ikatan F2 paling besar karena memiliki Panjang ikatan tertinggi", "Ikatan N2 paling sulit diputus karena memiliki orde ikatan terbesar", "Semakin tinggi orde ikatan maka semakin lemah ikatannya", "Semakin panjang suatu ikatan maka semakin lemah ikatannya"],
    answer: ["Ikatan N2 paling sulit diputus karena memiliki orde ikatan terbesar","Semakin panjang suatu ikatan maka semakin lemah ikatannya"],
  },
  {
    question: "Berdasarkan teori VSEPR, pernyataan yang benar tentang XeCl2 adalah ….",
    options: ["Bentuk molekulnya linear", "Bentuk molekulnya huruf V", "Memiliki geometri molekul tetrahedral", "Memiliki group elektron 4"],
    answer: ["Bentuk molekulnya linear","Memiliki group elektron 4"],
  },
  {
    question: "Diketahui entalpi pembentukan standar (ΔHf∘​) dari beberapa senyawa sebagai berikut:",
    img:"/soal/no3.png",
    options: ["Perubahan entalpi reaksi dapat dihitung menggunakan hukum Hess dengan rumus: ΔHreaksi=∑ΔHf∘(reaktan)−∑ΔHf∘(produk)", "Nilai ΔHreaksi adalah -1367 kJ/mol.", "Jika entalpi pembakaran karbon dan hidrogen diketahui, hukum Hess dapat digunakan untuk menghitung ΔHf∘​ etanol.", "Reaksi ini merupakan reaksi endoterm karena memerlukan oksigen dalam jumlah besar."],
    answer: ["Nilai ΔHreaksi adalah -1367 kJ/mol.","Jika entalpi pembakaran karbon dan hidrogen diketahui, hukum Hess dapat digunakan untuk menghitung ΔHf∘​ etanol."],
  },
  {
    question: "Berikut ini adalah tindakan-tindakan yang sesuai untuk menangani siswa yang berperilaku sulit",
    options: ["Bicara dengan mereka secara personal", "Menggunakan tutor Sebaya", "Pengendalian tingkat keparahan perilaku sulit peserta didik", "Mengisolasi dari peserta didik lainnya"],
    answer: ["Bicara dengan mereka secara personal","Menggunakan tutor Sebaya","Pengendalian tingkat keparahan perilaku sulit peserta didik"],
  },
  {
    question: "Langkah pertama dalam desain pembelajaran yang terstruktur adalah…",
    options: [
       "Menentukan metode evaluasi",
       "Merumuskan tujuan pembelajaran", 
       "Memilih materi pembelajaran",
      "Melaksananakan kegiatan pembelajaran"],
    answer: ["Merumuskan tujuan pembelajaran"],
  },
  {
    question: "Berikut ini pernyataan yang tepat sesuai prinsip-prinsip penyusunan laporan capaian belajar siswa adalah ….",
    options: [
       "Laporan harus mencakup aspek perkembangan kognitif, dan afektif,",
       "Laporan harus transparan dan mudah dipahami oleh siswa dan orang tua.", 
       "Laporan harus memuat informasi perkembangan akademik siswa",
      "Laporan harus didasarkan pada data dan fakta yang objektif"],
    answer: ["Laporan harus transparan dan mudah dipahami oleh siswa dan orang tua.","Laporan harus didasarkan pada data dan fakta yang objektif"],
  },
];

// {
//   question: "Berikut ini adalah tindakan-tindakan yang sesuai untuk menangani siswa yang berperilaku sulit",
//   options: [
//      "",
//      "", 
//      "",
//     ""],
//   answer: [""],
// },

const huruf = ["A","B","C","D"]

export default function QuizApp() {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [point, setPoint] = useState(0);

  useEffect(() => {
    let timer;
    if (timerRunning) {
      timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [timerRunning]);

  const handleStartQuiz = () => {
    setStarted(true);
    setTimerRunning(true);
  };

  const handleChange = (option) => {
    const question = quizQuestions[currentQuestionIndex].question;
    console.log(answers)
    setAnswers((prev) => {
      const selected = prev[question] || [];

      return {
        ...prev,
        [question]: selected.includes(option)
          ? selected.filter((item) => item !== option)
          : [...selected, option],
      };
    }
    );
  };

  const calculatePoints = () => {
    const arry = Object.values(answers)
    function countCommonValues(array1, array2) {
      const set1 = new Set(array1);
      const commonValuesCount = new Set(array2.filter(value => set1.has(value))).size;
      return commonValuesCount;
    }
    let pp = 0
    for (let i = 0; i < quizQuestions.length; i++) {
      let count = countCommonValues(arry[i], quizQuestions[i].answer)
      if (quizQuestions[i].answer.length == 1) {
        if (count == 1) {
          if (arry[i].length == 1) {
            pp+=2
          } else if (arry[i].length == 2) {
            pp+=1.75
          } else if (arry[i].length == 3) {
            pp+=1.5
          } else if (arry[i].length == 4) {
            pp+=1.25
            console.log(1.25)
          }
        } else if (count == 0) {
          if (arry[i].length == 0) {
            pp+=1
          }else if (arry[i].length == 1) {
            pp+=0.76
          } else if (arry[i].length == 2) {
            pp+=0.33
          } else if (arry[i].length == 3) {
            pp+=0
          }
        }

      } else if (quizQuestions[i].answer.length == 2) {
        if (count == 1) {
          if (arry[i].length == 1) {
            pp+=1.83
          } else if (arry[i].length == 2) {
            pp+=1.33
          } else if (arry[i].length == 3) {
            pp+=1.167
          } 
        } else if (count == 2) {
          if (arry[i].length == 2) {
            pp+=2
          } else if (arry[i].length == 3) {
            pp+=1.67
          } else if (arry[i].length == 4) {
            pp+=1.5
            console.log(1.5)
          }
        } else if (count == 0) {
          if (arry[i].length == 0) {
            pp+=1
          }else if (arry[i].length == 1) {
            pp+=0.5
          } else if (arry[i].length == 2) {
            pp+=0
          }
        }
      } else if (quizQuestions[i].answer.length == 3) {
        if (count == 1) {
          if (arry[i].length == 1) {
            pp+=1.67
          } else if (arry[i].length == 2) {
            pp+=1.167
          }
        } else if (count == 2) {
          if (arry[i].length == 2) {
            pp+=1.83
          } else if (arry[i].length == 3) {
            pp+=1.33
          }
        } else if (count == 3) {
          if (arry[i].length == 3) {
            pp+=2
          } else if (arry[i].length == 4) {
            pp+=1.5
            console.log(1.5)
          } 
        } else if (count == 0) {
          if (arry[i].length == 0) {
            pp+=1
          }else if (arry[i].length == 1) {
            pp+=0
          }
        }
      }
    }
    setPoint(prev=>prev+pp)
    console.log(pp)
  };

  const handleSubmit = () => {
    calculatePoints();
    setSubmitted(true);
    setTimerRunning(false);
  };

  const calculateResults = () => {
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    quizQuestions.forEach((q) => {
      const selectedAnswers = answers[q.question] || [];

      if (selectedAnswers.length === 0) {
        unattempted++;
      } else if (
        JSON.stringify(selectedAnswers.sort()) === JSON.stringify(q.answer.sort())
      ) {
        correct++;
      } else {
        incorrect++;
      }
    });

    return {
      correct,
      incorrect,
      unattempted,
      total: quizQuestions.length,
      percentage: ((correct / quizQuestions.length) * 100).toFixed(2),
    };
  };

  useEffect(() => {
    quizQuestions.forEach((v) => {
      answers[v.question] = []
    }
    )
  }, [])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const results = calculateResults();

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div onClick={(e)=>window.location.href = "/service_teacher"} className="border-4 rounded-lg text-2xl px-3 py-1 absolute top-0 right-0 mr-10 mt-5 cursor-pointer">
        X
      </div>
      {!started ? (
        <div className="text-center h-screen flex items-center justify-center">
          <div className="m-auto">
          <h1 className="text-3xl font-bold mb-2">Practice Test</h1>
          <p className="text-lg mb-4">Klik tombol "start" untuk memulai practice test</p>
          <button
            onClick={handleStartQuiz}
            className="px-10 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-600"
          >
            Start
          </button>
           </div> 
          
        </div>
      ) : (
        <div className="flex w-full">
          {/* Sidebar Kiri */}
          <div className="w-[15%] p-4 bg-gray-200">
            <h2 className="text-blue-600 font-bold text-center mb-2">Soal</h2>
            <div className="grid grid-cols-3 gap-1">
              {quizQuestions.map((q, index) => {
                let bgColor = "bg-gray-300";

                if (answers[q.question]?.length > 0) {
                  bgColor = "bg-green-500";
                }

                return (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={`w-10 h-10 text-xs border rounded text-white font-bold ${bgColor}`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Konten utama */}
          <div className="flex flex-col items-center w-full p-6">
            <h1 className="text-2xl font-bold mb-2">Practice Test</h1>
            <p className="mb-4 text-gray-600">Waktu: {formatTime(timeElapsed)}</p>

            {!submitted ? (
              <>
                <div className="w-[80%] bg-white p-6 rounded shadow-md mb-8">
                  <h2 className="text-lg font-semibold mb-2">
                    {quizQuestions[currentQuestionIndex].question}
                  </h2>
                  {quizQuestions[currentQuestionIndex].img ? <img className="mb-2" src={quizQuestions[currentQuestionIndex].img} /> : ""}
                  <div className="mt-2">
                    {quizQuestions[currentQuestionIndex].options.map((option,i) => (
                      <label key={option} className="block w-[70%] mb-2">
                        <input
                          type="checkbox"
                          checked={answers[quizQuestions[currentQuestionIndex].question]?.includes(option) || false}
                          onChange={() => handleChange(option)}
                          className="mr-2"
                        />
                        {`${huruf[i]}. ${option}`}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between w-3/4 mt-4">
                  <button
                    onClick={() => setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))}
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentQuestionIndex((prev) => Math.min(prev + 1, quizQuestions.length - 1))}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Next
                  </button>
                </div>

                <button
                  onClick={handleSubmit}
                  className="mt-4 bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600"
                >
                  Submit Quiz
                </button>
              </>
            ) : (
              <>
                {/* Summary */}
                <p className="text-3xl">{point}</p>
                <table className="border-collapse w-3/4 text-center mt-4">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border px-4 py-2">Correct</th>
                      <th className="border px-4 py-2">Incorrect</th>
                      <th className="border px-4 py-2">Unanswered</th>
                      <th className="border px-4 py-2">Total</th>
                      <th className="border px-4 py-2">Waktu</th>
                      <th className="border px-4 py-2">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">{results.correct}</td>
                      <td className="border px-4 py-2">{results.incorrect}</td>
                      <td className="border px-4 py-2">{results.unattempted}</td>
                      <td className="border px-4 py-2">{results.total}</td>
                      <td className="border px-4 py-2">{formatTime(timeElapsed)}</td>
                      <td className="border px-4 py-2">{results.percentage}%</td>
                    </tr>
                  </tbody>
                </table>

                {/* Chart Persentase Jawaban */}
                <div className="w-3/4 mt-4 flex">
                  <div className="h-6" style={{ width: `${(results.correct / results.total) * 100}%`, backgroundColor: "green", textAlign: "center", color: "white" }}>
                    {(results.correct * 100 / results.total).toFixed(0)}%
                  </div>
                  <div className="h-6" style={{ width: `${(results.incorrect / results.total) * 100}%`, backgroundColor: "red", textAlign: "center", color: "white" }}>
                    {(results.incorrect * 100 / results.total).toFixed(0)}%
                  </div>
                  <div className="h-6" style={{ width: `${(results.unattempted / results.total) * 100}%`, backgroundColor: "blue", textAlign: "center", color: "white" }}>
                    {(results.unattempted * 100 / results.total).toFixed(0)}%
                  </div>
                </div>
                {/* Soal & Jawaban Setelah Submit */}
                <div className="w-3/4 mt-4">
                  {quizQuestions.map((q, index) => (
                    <div key={index} className="border p-4 mb-4 rounded shadow">
                      <h2 className="text-lg font-semibold">{index + 1}. {q.question}</h2>
                      {q.options.map((option) => {
                        const isCorrect = q.answer.includes(option);
                        const isSelected = (answers[q.question] || []).includes(option);
                        const borderClass = isSelected
                          ? isCorrect
                            ? "border-green-500"
                            : "border-red-500"
                          : "";

                        return (
                          <div key={option} className={`mt-2 p-2 border ${borderClass} rounded`}>
                            <input type="checkbox" checked={isSelected} disabled className="mr-2" />
                            {option}
                            {isCorrect && <span className="ml-2 bg-green-500 text-white px-2 rounded">Correct</span>}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
