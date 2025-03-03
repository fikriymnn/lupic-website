"use client"
import React, { useState,useEffect } from "react";
import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import { motion } from "framer-motion";
import axios from "axios";

const VidPage = () => {
  const [videos,setVideos] = useState([
    { title: "Synthesis of Tertiary Butyl Chloride", url: "https://www.youtube.com/watch?v=RQ74OmcI1OI" },
    { title: "Synthesis of Dibenzalacetone", url: "https://www.youtube.com/watch?v=VIDEO_ID_2" },
    { title: "Synthesis of Ethyl Acetate", url: "https://www.youtube.com/watch?v=VIDEO_ID_3" },
    { title: "Synthesis of Cyclohexene", url: "https://www.youtube.com/watch?v=VIDEO_ID_4" },
  ]);

  const [books,setBooks] = useState([
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
  ]);

  useEffect(() => {
    async function getData() {
      try {
        const Data = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/video")
        const Data2 = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/modul")
        if (Data.data) {
          setVideos(Data.data)
        }
        if (Data2.data) {
          setBooks(Data2.data)
        }

      } catch (err) {
        console.log(err.message)
      }
    }
    getData();
  }, [])

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Our Videos</h2>
      <div className="w-[90%] m-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map((video, index) => (
           <div key={index} className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
           <ReactPlayer
             url={video.link}
             controls
             width="100%"
             height="200px"
           />
           <h3 className="text-lg font-semibold mt-2 line-clamp-2">{video.judul}</h3>
         </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4 text-center">Books/Modules</h2>
      <div className="w-[95%] justify-items-center m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {books.map((book, index) => (
          <div key={index} className="w-[330px] bg-white shadow-lg p-4 text-white text-center rounded-lg bg-gray-800">
          <img src={process.env.NEXT_PUBLIC_API_FILE_URL+book.cover} alt={book.judul} className="w-full h-48 object-cover rounded-md" />
          <h3 className="text-lg font-semibold mt-2">{book.judul}</h3>
          <a href={process.env.NEXT_PUBLIC_API_FILE_URL+book.file} download>
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
