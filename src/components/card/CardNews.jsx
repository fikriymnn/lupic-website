"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { formatTanggalIndonesia } from "@/utils/formatTanggal"

export default function CardNews({ gambar, judul, deskripsi, tanggal, id }) {
  const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + " ...";
    }
    return text;
  };

  return (
    <motion.a
      href={`/news/${id}`}
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="block bg-white rounded-lg shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300 w-full max-w-[350px] pb-2 border border-gray-200"
    >
      <div className="relative w-full h-[200px]">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_FILE_URL}${gambar}`}
          alt={judul}
          fill
          priority
          className="object-cover rounded-t-xl"
        />
      </div>

      <div className="p-4 h-[150px]">
        <h3 className="font-bold text-base text-koreaBlue line-clamp-2 mb-1">
          {judul}
        </h3>
        <p className="text-xs text-koreaBlueMuda mb-2">{formatTanggalIndonesia(tanggal)}</p>
        <p className="text-xs text-gray-700 line-clamp-2">
          {deskripsi}
        </p>
      </div>
    </motion.a>
  );
}
