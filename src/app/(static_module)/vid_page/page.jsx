"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";
import dynamic from "next/dynamic";
import axios from "axios";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const VidPage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/video");
        if (response.data) {
          setVideos(response.data);
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
        <h2 className="text-2xl font-bold mb-4 text-center">Our Videos</h2>
        <div className="w-[90%] m-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {videos.map((video, index) => (
            <div key={index} className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
              <ReactPlayer url={video.link} controls width="100%" height="200px" />
              <h3 className="text-lg font-semibold mt-2 line-clamp-2">{video.judul}</h3>
            </div>
          ))}
        </div>
      </div>
      <CustomFooter />
    </>
  );
};

export default VidPage;
