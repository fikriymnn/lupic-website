"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [heroData, setHeroData] = useState({
    hero_section: "",
    hero_title: "Leading University Project for International Cooperation",
    hero_description: "Improving Chemistry/Science Education Program in Java and Northern Bali Islands and Community Service",
    hero_partner: ""
  });

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/api/home"
        );
        const data = response.data;
        
        setHeroData({
          hero_section: data.hero_section || "",
          hero_title: data.hero_title || "Leading University Project for International Cooperation",
          hero_description: data.hero_description || "Improving Chemistry/Science Education Program in Java and Northern Bali Islands and Community Service",
          hero_partner: data.hero_partner || ""
        });
      } catch (err) {
        console.log("Error loading hero data:", err.message);
      }
    }
    getData();
  }, []);

  return (
    <div className="relative h-[70vh] md:min-h-[110vh] text-white flex flex-col justify-center items-center px-4 md:px-6 pt-14 overflow-hidden">

      {/* Background Image */}
      {heroData.hero_section && (
        <img
          src={process.env.NEXT_PUBLIC_API_FILE_URL + heroData.hero_section}
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-500 to-black opacity-75 z-0"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center">
        <Link href="/activities">
          <button className="bg-koreaBlue py-2 px-2 md:px-4 rounded-full text-[6px] md:text-xs font-bold mb-4 hover:bg-red-600">
            In Collaboration With Great Univ
          </button>
        </Link>

        {/* Hero Partner Image - Dynamic */}
        <div className="space-x-4 mb-6">
          {heroData.hero_partner ? (
            <img
              src={process.env.NEXT_PUBLIC_API_FILE_URL + heroData.hero_partner}
              alt="Partner Logos"
              className="h-8 md:h-16"
            />
          ) : (
            <img
              src="/images/logo-instansi-home-new.png"
              alt="Logo-logo instansi"
              className="h-8 md:h-16"
            />
          )}
        </div>

        {/* Hero Title - Dynamic */}
        <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-center font-extrabold mb-4 max-w-4xl">
          {heroData.hero_title}
        </h1>

        {/* Hero Description - Dynamic */}
        <p className="text-xs md:text-2xl text-center mb-6 mx-4 md:mx-12 max-w-[600px]">
          {heroData.hero_description}
        </p>

        <Link href="/aboutus">
          <button className="bg-white text-red-700 py-2 px-4 md:px-6 rounded-lg hover:bg-red-700 hover:text-white transition-colors duration-200">
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
}