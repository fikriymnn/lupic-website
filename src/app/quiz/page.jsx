"use client";
import React, { useState, useEffect } from "react";

const quizQuestions = [
  {
    question: "Apa ibukota Jepang?",
    options: ["Seoul", "Tokyo", "Beijing", "Bangkok"],
    answer: ["Tokyo"],
  },
  {
    question: "Berapa hasil dari 5 + 3?",
    options: ["6", "7", "8", "9"],
    answer: ["8"],
  },
  {
    question: "Pilih ilmuwan yang berkontribusi dalam fisika?",
    options: ["Newton", "Einstein", "Tesla", "Edison"],
    answer: ["Newton", "Einstein", "Tesla"],
  },
];

export default function QuizApp() {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

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
    setAnswers((prev) => {
      const selected = prev[question] || [];
      return {
        ...prev,
        [question]: selected.includes(option)
          ? selected.filter((item) => item !== option)
          : [...selected, option],
      };
    });
  };

  const handleSubmit = () => {
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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const results = calculateResults();

  return (
    <div className="flex items-center justify-center bg-gray-100">
      {!started ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Selamat Datang di Quiz</h1>
          <button
            onClick={handleStartQuiz}
            className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-600"
          >
            Mulai Quiz
          </button>
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
            <h1 className="text-2xl font-bold mb-2">Quiz Pilihan Ganda</h1>
            <p className="mb-4 text-gray-600">Waktu: {formatTime(timeElapsed)}</p>

            {!submitted ? (
              <>
                <div className="w-[30%] bg-white p-6 rounded shadow-md">
                  <h2 className="text-lg font-semibold">
                    {quizQuestions[currentQuestionIndex].question}
                  </h2>
                  <div className="mt-2">
                    {quizQuestions[currentQuestionIndex].options.map((option) => (
                      <label key={option} className="block">
                        <input
                          type="checkbox"
                          checked={answers[quizQuestions[currentQuestionIndex].question]?.includes(option) || false}
                          onChange={() => handleChange(option)}
                          className="mr-2"
                        />
                        {option}
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
