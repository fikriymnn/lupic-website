"use client"
import React from "react";
import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import { motion } from "framer-motion";

const VidPage = () => {
  const videos = [
    { title: "Synthesis of Tertiary Butyl Chloride", url: "https://www.youtube.com/watch?v=RQ74OmcI1OI" },
    { title: "Synthesis of Dibenzalacetone", url: "https://www.youtube.com/watch?v=VIDEO_ID_2" },
    { title: "Synthesis of Ethyl Acetate", url: "https://www.youtube.com/watch?v=VIDEO_ID_3" },
    { title: "Synthesis of Cyclohexene", url: "https://www.youtube.com/watch?v=VIDEO_ID_4" },
  ];

  const books = [
    {
      id: 1,
      title: "Basic Theory of Fablab Module",
      cover: "/1.png",
      author: "",
      pdfLink: "/1.pdf"
    },
    {
      id: 2,
      title: "Fablab Workshop Guidebook",
      cover: "/2.png",
      author: "",
      pdfLink: "2.pdf"
    },
    {
      id: 3,
      title: "Praktikum Kimia Organik Skala Kecil",
      cover: "/3.png",
      author: "",
      pdfLink: "/3.pdf"
    },
    {
      id: 4,
      title: "Petunjuk Praktikum Pemisahan dan Pemurnian Skala Kecil",
      cover: "/4.png",
      author: "",
      pdfLink: "/4.pdf"
    },
    {
      id: 5,
      title: "Kewirausahaan Kimia Berkelanjutan",
      cover: "/5.png",
      author: "",
      pdfLink: "/5.pdf"
    },
    {
      id: 6,
      title: "Buku Ajar Kimia Lingkungan",
      cover: "/6.png",
      author: "",
      pdfLink: "/6.pdf"
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Our Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map((video, index) => (
           <div key={index} className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
           <ReactPlayer
             url={video.url}
             controls
             width="100%"
             height="200px"
           />
           <h3 className="text-lg font-semibold mt-2">{video.title}</h3>
         </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4 text-center">Books/Modules</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {books.map((book, index) => (
          <div key={index} className="bg-white shadow-lg p-4 text-center rounded-lg">
          <img src={book.image} alt={book.title} className="w-full h-48 object-cover rounded-md" />
          <h3 className="text-lg font-semibold mt-2">{book.title}</h3>
          <a href={book.pdf} download>
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

export default VidPage;
