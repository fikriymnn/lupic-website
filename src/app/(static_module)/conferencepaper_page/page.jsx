"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";
import axios from "axios";

const ConferencePaperPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/paper");
        if (response.data) {
          setBooks(response.data);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    getData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Conference Paper</h2>
        <div className="w-[95%] justify-items-center m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {books.map((book, index) => (
            <div key={index} className="w-[330px] bg-white shadow-lg p-4 text-center rounded-lg bg-gray-800">
              <img
                src={process.env.NEXT_PUBLIC_API_FILE_URL + book.cover}
                alt={book.judul}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2">{book.judul}</h3>
              <a href={process.env.NEXT_PUBLIC_API_FILE_URL + book.file} download>
                <button className="mt-2 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
                  Unduh PDF
                </button>
              </a>
            </div>
          ))}
        </div>
      </div>
      <CustomFooter />
    </>
  );
};

export default ConferencePaperPage;
