import React from "react";
import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";

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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-center mb-8 text-3xl font-bold text-white">
            Video Demonstrasi Proses Kimia
          </h1>
          
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
      </div>
      <CustomFooter />
    </>
  );
};

export default VidPage;
