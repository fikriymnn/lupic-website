'use client';

import { useState } from 'react';

const questions = [
  {
    id: 1,
    question: 'Siapakah penemu teori relativitas?',
    image: '/einstein.png',
    options: ['Peter Parker', 'Albert Einstein', 'Leonardo Da Vinci', 'Adam Smith', 'Donald Trump'],
    jawaban: "",
    type: "A"
  },
  {
    id: 2,
    question: 'Apa ibu kota Prancis?',
    image: '',
    options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
    jawaban: "",
    type: "B"
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill([]));

  const handleOptionChange = (option) => {
    setAnswers((prev) => {
      const updatedAnswers = [...prev];
      const selected = updatedAnswers[currentQuestion] || [];
      updatedAnswers[currentQuestion] = selected.includes(option)
        ? selected.filter((o) => o !== option)
        : [...selected, option];
      return updatedAnswers;
    });
    console.log(answers)
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
      <div className="flex gap-4 w-full p-10 h-screen">
        {/* Sidebar nomor soal */}
        <div className="grid grid-cols-3 gap-2 bg-white p-4 shadow-md">
          {questions.map((q, index) => (
            <button
              key={q.id}
              onClick={() => setCurrentQuestion(index)}
              className={`w-10 h-10 flex items-center justify-center border rounded-md ${
                currentQuestion === index
                  ? 'bg-blue-500 text-white'
                  : answers[index] && answers[index].length > 0
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200'
              }`}
            >
              {q.id}
            </button>
          ))}
        </div>

        {/* Konten soal */}
        <div className="bg-white p-6 shadow-lg w-full">
          <h2 className="mb-4 text-lg font-bold">{questions[currentQuestion].question}</h2>
          {questions[currentQuestion].image && (
            <img src={questions[currentQuestion].image} alt="Question" className="mb-4 w-full" />
          )}
          <div>
            {questions[currentQuestion].options.map((option) => (
              <label key={option} className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={(answers[currentQuestion] || []).includes(option)}
                  onChange={() => handleOptionChange(option)}
                  className="h-5 w-5"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {/* Tombol navigasi */}
          <div className="mt-4 flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentQuestion === questions.length - 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
  );
}