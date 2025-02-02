"use client"
import React from "react";
import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";
import { motion } from "framer-motion";

const VidPage = () => {
  const videos = [
    {
      id: 1,
      title: "Synthesis of Tertiary Butyl Chloride",
      source: "/videos/1.mp4"
    },
    {
      id: 2,
      title: "Synthesis of Dibenzalacetone",
      source: "/videos/2.mp4"
    },
    {
      id: 3,
      title: "Synthesis of Ethyl Acetate",
      source: "/videos/3.mp4"
    },
    {
      id: 4,
      title: "Synthesis of Cyclohexene",
      source: "/videos/4.mp4"
    }
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
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8 ">
          <h1 className="text-center  text-3xl font-bold text-black">
            Our Videos
          </h1>
          <div className="h-1 w-36 bg-koreaRed mb-8 m-auto"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {videos.map((video) => (
              <div key={video.id} className="bg-gray-800 rounded-lg shadow-lg p-4">
                <h2 className="text-xl font-semibold text-white mb-4">{video.title}</h2>
                <video 
                  controls
                  className="w-full h-64"
                  src={video.source}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-center text-3xl font-bold text-black">
            Books/Modules
          </h1>
          <div className="h-1 w-36 bg-koreaRed mb-8 m-auto"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {books.map((book) => (
              <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }} key={book.id} className="bg-gray-800 rounded-lg shadow-lg p-4 mx-5">
                <div className="mb-4">
                  <img 
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-28 md:h-96 object-cover rounded-lg mb-4"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-8">{book.title}</h3>
                
                <a
                  href={book.pdfLink}
                  download
                  className="w-full bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-white cursor-pointer transition duration-300 transform hover:scale-105"
                  onClick={() => window.open(book.pdfLink)}
                >
                  Unduh PDF
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <CustomFooter />
    </>
  );
};

export default VidPage;
