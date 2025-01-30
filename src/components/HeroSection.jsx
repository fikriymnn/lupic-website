"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [gambar, setGambar] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const data = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/api/home"
        );
        setGambar(data.data.hero_section);
      } catch (err) {
        console.log(err.message);
      }
    }
    getData();
  });
  return (
    <div
      className="relative bg-cover bg-center h-screen text-white flex flex-col justify-center items-center px-4 md:px-6"
      style={{
        backgroundImage: `url(${
          process.env.NEXT_PUBLIC_API_FILE_URL + gambar
        })`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-500 to-black opacity-75 z-0"></div>

      <div className="relative z-10 flex flex-col justify-center items-center">
        <Link href="/activities">
          <button className="bg-koreaBlue py-3 px-4 md:px-8 rounded-full text-xs font-bold md:text-sm mb-4 hover:bg-red-600">
            In Collaboration With Great Univ
          </button>
        </Link>

        <div className="space-x-4 mb-6">
          <img
            src="/images/logo-instansi-home-new.png"
            alt="Logo-logo instansi"
            className="h-8 md:h-24"
          />
        </div>

        <h1 className="text-3xl w-[80%] md:text-6xl lg:text-6xl font-bold text-center mb-4 mx-6 md:mx-12 lg:mx-56 ">
          Leading University Project for International Cooperation
        </h1>

        <p className="text-sm md:w-[60%] w-[80%] md:text-2xl text-center mb-6 mx-4 md:mx-12">
          Improving Chemistry/Science Education Program in Java and Northern
          Bali Islands and Community Service
        </p>

        <Link href="/aboutus">
          <button className="bg-white text-red-700 py-2 px-4 md:px-6 rounded-lg hover:bg-red-700 hover:text-white">
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
}
