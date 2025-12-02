"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Upload } from "lucide-react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export default function CreateVideoModul() {
  const router = useRouter()
  const { id } = useParams()
  const [formData, setFormData] = useState({
    judul: "",
    tujuanPembelajaran: "",
    deskripsi: "",
    linkVideo: "",
    jenjang: "SD",
    topikIPA: "Fisika",
    status: "GRATIS",
  });

  const handleChange = (field, value) => {
    console.log(formData)
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(process.env.NEXT_PUBLIC_API_URL + "/api/video_pembelajaran/" + id, formData)
      if (res.data) {
        alert("Video pembelajaran berhasil diupdate!")
        router.push("/lgndmn/dashboard/video_training")
      }
    } catch (err) {
      console.log(err.message)
    }
    console.log("Saving video modul:", formData);
  };

  const getData = async () => {
    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/video_pembelajaran/" + id)
      if(res.data){
        console.log(res.data)
        setFormData(res.data)
      }
    } catch (err) {
      console.log(err.message)
    }
  }
  useEffect(() => {
    getData()
  }, [])



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl">
        <div className="flex">
          <Sidebar />

          {/* Placeholder Sidebar Offset */}
          <div className="w-64 bg-gray-100"></div>

          <div className="w-full">
            <div className="p-4 w-[90%] mx-auto">
              <div className="max-w-7xl">
                {/* Title */}
                <div className="mb-8">
                  <h1 className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                    Create Video Modul
                  </h1>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-xl shadow-lg p-8 space-y-6"
                >
                  {/* Judul */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Judul Video *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.judul}
                      onChange={(e) => handleChange("judul", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Deskripsi */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Deskripsi *
                    </label>
                    <textarea
                      required
                      value={formData.deskripsi}
                      onChange={(e) => handleChange("deskripsi", e.target.value)}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Jenjang */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Jenjang *
                      </label>
                      <select
                        required
                        value={formData.jenjang}
                        onChange={(e) =>
                          handleChange("jenjang", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="SD">SD</option>
                        <option value="SMP">SMP</option>
                      </select>
                    </div>

                    {/* Topik */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Topik *
                      </label>
                      <select
                        required
                        value={formData.topikIPA}
                        onChange={(e) =>
                          handleChange("topikIPA", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Fisika">Fisika</option>
                        <option value="Biologi">Biologi</option>
                        <option value="IPA Terpadu">IPA Terpadu</option>
                      </select>
                    </div>

                    {/* Status */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Status *
                      </label>
                      <select
                        required
                        value={formData.status}
                        onChange={(e) =>
                          handleChange("status", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="GRATIS">GRATIS</option>
                        <option value="BERBAYAR">BERBAYAR</option>
                      </select>
                    </div>
                  </div>

                  {/* Tujuan Pembelajaran */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tujuan Pembelajaran *
                    </label>
                    <textarea
                      required
                      value={formData.tujuanPembelajaran}
                      onChange={(e) =>
                        handleChange("tujuanPembelajaran", e.target.value)
                      }
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Link Video */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Link Video (YouTube) *
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.linkVideo}
                      onChange={(e) => handleChange("linkVideo", e.target.value)}
                      placeholder="https://youtube.com/..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-koreaBlueMuda text-white rounded-lg transition font-medium"
                    >
                      Simpan Video Modul
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
