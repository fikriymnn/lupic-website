"use client";
import Footer from "@/components/CustomFooter";
import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  Upload,
} from "lucide-react";

const modul = {
  _id: "1",
  judulModul: "Hukum Newton dan Penerapannya",
  deskripsi:
    "Modul pembelajaran lengkap tentang Hukum Newton dengan pendekatan kontekstual",
  jenjang: "SMP",
  topikIPA: "Fisika",
  tujuanPembelajaran:
    "Siswa mampu memahami dan menerapkan konsep Hukum Newton dalam kehidupan sehari-hari",
  status: "BERBAYAR",
  file: "/files/modul-newton.pdf",
};

const SUMBER_INFORMASI_OPTIONS = [
  "Media Sosial (Instagram, Facebook, TikTok, X, dll.)",
  "Website Resmi Universitas / Kampus Penyelenggara",
  "Teman / Rekan Guru / Komunitas Pendidik",
  "Grup WhatsApp / Telegram / Komunitas Daring Guru",
  "Dosen / Pembimbing Kampus / Alumni PPG",
  "Seminar / Webinar Pendidikan / Workshop Daring",
  "Poster / Brosur / Pamflet Digital",
  "Iklan Internet (Google Ads / YouTube / Media Online)",
  "Dinas Pendidikan / LPTK / Sekolah Asal",
  "Lainnya",
];

export default function FormBukaModul() {
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    no_whatsapp: "",
    provinsi: "",
    jenjang_sekolah: "",
    nama_instansi: "",
    mata_pelajaran: "",
    status_ppg: "",
    sumber_informasi: [] ,
    sumber_informasi_lainnya: "",
    bukti_pembayaran: null
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // pastikan render hanya di client

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSumberInfoChange = (option) => {
    setFormData((prev) => {
      const alreadySelected = prev.sumber_informasi.includes(option);
      return {
        ...prev,
        sumber_informasi: alreadySelected
          ? prev.sumber_informasi.filter((item) => item !== option)
          : [...prev.sumber_informasi, option],
      };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, bukti_pembayaran: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Formulir berhasil dikirim! Silakan tunggu konfirmasi akses dari admin.");
  };

return (
    <>
    <Navbar/>

    <div className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-4xl mx-auto p-6 ">
        <button
          className="mb-6 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition flex items-center gap-2"
        >
          <ChevronLeft size={20} />
          Kembali
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Formulir Akses Modul
            </h1>
            <p className="text-gray-600">
              Modul: <span className="font-semibold">{modul.judulModul}</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Status:{" "}
              <span className="font-semibold text-orange-600">
                {modul.status}
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
        
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ["Nama Lengkap *", "nama", "text"],
                ["Email *", "email", "email"],
                ["No. WhatsApp *", "no_whatsapp", "tel"],
                ["Provinsi *", "provinsi", "text"],
                ["Jenjang Sekolah *", "jenjang_sekolah", "text"],
                ["Nama Instansi *", "nama_instansi", "text"],
                ["Mata Pelajaran *", "mata_pelajaran", "text"],
              ].map(([label, field, type]) => (
                <div key={field}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {label}
                  </label>
                  <input
                    type={type}
                    required
                    value={(formData)[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status PPG
                </label>
                <select
                  value={formData.status_ppg}
                  onChange={(e) => handleChange("status_ppg", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Pilih Status PPG</option>
                  <option value="PPG Calon Guru/PPG luar jabatan (Prajabatan)">
                    PPG Calon Guru/PPG luar jabatan (Prajabatan)
                  </option>
                  <option value="PPG bagi Guru Tertentu/PPG dalam jabatan (Daljab)">
                    PPG bagi Guru Tertentu/PPG dalam jabatan (Daljab)
                  </option>
                </select>
              </div>
            </div>


            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Sumber Informasi * (dapat memilih lebih dari satu)
              </label>
              <div className="space-y-2">
                {SUMBER_INFORMASI_OPTIONS.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-start gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.sumber_informasi.includes(option)}
                      onChange={() => handleSumberInfoChange(option)}
                      className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>

              {formData.sumber_informasi.includes("Lainnya") && (
                <input
                  type="text"
                  placeholder="Sebutkan sumber informasi lainnya"
                  value={formData.sumber_informasi_lainnya}
                  onChange={(e) =>
                    handleChange("sumber_informasi_lainnya", e.target.value)
                  }
                  className="w-full mt-3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              )}
            </div>


            {modul.status === "BERBAYAR" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bukti Pembayaran *
                </label>
                <label className="flex-1 cursor-pointer">
                  <div className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 transition flex items-center justify-center gap-2 text-gray-600">
                    <Upload size={20} />
                    <span>
                      {formData.bukti_pembayaran
                        ? formData.bukti_pembayaran.name
                        : "Pilih file bukti pembayaran"}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  Format: JPG, PNG, atau PDF (Max 5MB)
                </p>
              </div>
            )}


            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
              >
                Kirim Formulir
              </button>
              <button
                type="button"
                className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-medium"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer/> 
        </>
  );
}
