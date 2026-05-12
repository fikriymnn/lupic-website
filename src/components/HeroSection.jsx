"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [heroData, setHeroData] = useState({
    hero_section: "",
    hero_title: "Leading University Project for International Cooperation",
    hero_description:
      "Improving Chemistry/Science Education Program in Java and Northern Bali Islands and Community Service",
    hero_partner: "",
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
          hero_title:
            data.hero_title ||
            "Leading University Project for International Cooperation",
          hero_description:
            data.hero_description ||
            "Improving Chemistry/Science Education Program in Java and Northern Bali Islands and Community Service",
          hero_partner: data.hero_partner || "",
        });
      } catch (err) {
        console.log("Error loading hero data:", err.message);
      }
    }
    getData();
  }, []);

  return (
    <div className="relative min-h-screen text-white flex flex-col justify-center items-center px-6 md:px-12 pt-16 overflow-hidden">

      {/* Background Image */}
      {heroData.hero_section && (
        <img
          src={process.env.NEXT_PUBLIC_API_FILE_URL + heroData.hero_section}
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto gap-6">

        {/* Badge */}
        <Link href="/activities">
          <span className="inline-block bg-koreaBlue hover:bg-red-600 transition-colors duration-200 text-white text-xs font-semibold px-4 py-1.5 rounded-full cursor-pointer">
            In Collaboration With Great Univ
          </span>
        </Link>

        {/* Partner Logos */}
        <div>
          <img
            src={
              heroData.hero_partner
                ? process.env.NEXT_PUBLIC_API_FILE_URL + heroData.hero_partner
                : "/images/logo-instansi-home-new.png"
            }
            alt="Partner Logos"
            className="h-10 md:h-16 object-contain"
          />
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
          {heroData.hero_title}
        </h1>

        {/* Hero Description */}
        <p className="text-sm md:text-lg text-white/80 leading-relaxed max-w-2xl">
          {heroData.hero_description}
        </p>

        {/* CTA Button */}
        <Link href="/aboutus">
          <button className="bg-white text-red-700 font-semibold text-sm md:text-base py-2.5 px-8 rounded-lg hover:bg-red-700 hover:text-white transition-colors duration-200">
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
}