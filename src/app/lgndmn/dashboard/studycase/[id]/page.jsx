"use client";

import { useState } from "react";

export default function ModulAjarAccessAdmin() {
  const [data, setData] = useState([
    {
      _id: "1",
      modulAjar: "1",
      nama: "Ibu Sarah Wijaya",
      email: "sarah@email.com",
      no_whatsapp: "081234567890",
      provinsi: "Jawa Timur",
      jenjang_sekolah: "SMP",
      nama_instansi: "SMP Negeri 1 Surabaya",
      mata_pelajaran: "IPA",
      status_ppg: "PPG Calon Guru/PPG luar jabatan (Prajabatan)",
      sumber_informasi: "Media Sosial (Instagram, Facebook, TikTok, X, dll.)",
      status: "NO ACCESS",
      tanggal_pengisi: new Date("2024-11-01"),
      bukti_pembayaran: "/uploads/bukti-sarah.jpg",
    },
    {
      _id: "2",
      modulAjar: "2",
      nama: "Bapak Ardiansyah",
      email: "ardi@email.com",
      no_whatsapp: "089876543210",
      provinsi: "Jawa Barat",
      jenjang_sekolah: "SD",
      nama_instansi: "SDN 5 Bandung",
      mata_pelajaran: "IPA",
      status_ppg: "PPG Dalam Jabatan",
      sumber_informasi: "Rekan Guru",
      status: "ACCESS",
      tanggal_pengisi: new Date("2024-10-28"),
      bukti_pembayaran: "/uploads/bukti-ardi.jpg",
    },
  ]);

  // Toggle status ACCESS <-> NO ACCESS
  const toggleStatus = (id) => {
    setData((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, status: item.status === "ACCESS" ? "NO ACCESS" : "ACCESS" }
          : item
      )
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        📋 Daftar User Access Modul Ajar
      </h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Nama</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">No. WhatsApp</th>
              <th className="px-4 py-2 border">Provinsi</th>
              <th className="px-4 py-2 border">Jenjang</th>
              <th className="px-4 py-2 border">Instansi</th>
              <th className="px-4 py-2 border">Mata Pelajaran</th>
              <th className="px-4 py-2 border">Status PPG</th>
              <th className="px-4 py-2 border">Sumber Informasi</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Bukti Pembayaran</th>
              <th className="px-4 py-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item._id}
                className="text-sm text-gray-800 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-2 border font-medium">{item.nama}</td>
                <td className="px-4 py-2 border">{item.email}</td>
                <td className="px-4 py-2 border">{item.no_whatsapp}</td>
                <td className="px-4 py-2 border">{item.provinsi}</td>
                <td className="px-4 py-2 border">{item.jenjang_sekolah}</td>
                <td className="px-4 py-2 border">{item.nama_instansi}</td>
                <td className="px-4 py-2 border">{item.mata_pelajaran}</td>
                <td className="px-4 py-2 border">{item.status_ppg}</td>
                <td className="px-4 py-2 border">{item.sumber_informasi}</td>
                <td className="px-4 py-2 border text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === "ACCESS"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* 📎 Bukti Pembayaran */}
                <td className="px-4 py-2 border text-center">
                  {item.bukti_pembayaran ? (
                    <a
                      href={item.bukti_pembayaran}
                      download
                      className="text-blue-600 hover:underline text-xs"
                    >
                      Download Bukti
                    </a>
                  ) : (
                    <span className="text-gray-400 text-xs italic">Belum ada</span>
                  )}
                </td>

                {/* 🔄 Aksi */}
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => toggleStatus(item._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded transition"
                  >
                    Ubah Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
