"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { formatTanggalIndonesia } from "@/utils/formatTanggal"

export default function CardNews({ gambar, judul, deskripsi, tanggal, id }) {

  return (
    <motion.a
      href={`/news/${id}`}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="block bg-gray-50 p-2 rounded-md overflow-hidden w-full max-w-[350px] "
    >
      <div className="relative w-full h-[200px]">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_FILE_URL}${gambar}`}
          alt={judul}
          fill
          priority
          className="object-cover rounded-t-md"
        />
      </div>

      <div className="py-4 h-[120px]">
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
