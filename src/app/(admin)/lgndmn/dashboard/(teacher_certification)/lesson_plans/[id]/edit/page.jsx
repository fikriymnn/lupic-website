"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download, BookOpen, Edit, Trash2, Plus, Users, CheckCircle, XCircle, Upload, Filter } from 'lucide-react';
import Sidebar from "@/components/Sidebar";
import axios from 'axios';
import { useParams } from 'next/navigation';

const mockModulAjar = [
  {
    _id: '1',
    judulModul: 'Hukum Newton dan Penerapannya',
    deskripsi: 'Modul pembelajaran lengkap tentang Hukum Newton dengan pendekatan kontekstual',
    jenjang: 'SMP',
    topikIPA: 'Fisika',
    tujuanPembelajaran: 'Siswa mampu memahami dan menerapkan konsep Hukum Newton dalam kehidupan sehari-hari',
    status: 'BERBAYAR',
    file: '/files/modul-newton.pdf'
  },
  {
    _id: '2',
    judulModul: 'Fotosintesis dan Respirasi Tumbuhan',
    deskripsi: 'Modul pembelajaran interaktif tentang proses fotosintesis dan respirasi pada tumbuhan',
    jenjang: 'SD',
    topikIPA: 'Biologi',
    tujuanPembelajaran: 'Siswa dapat menjelaskan proses fotosintesis dan respirasi tumbuhan',
    status: 'GRATIS',
    file: '/files/modul-fotosintesis.pdf'
  },
  {
    _id: '3',
    judulModul: 'Siklus Air dan Perubahan Wujud',
    deskripsi: 'Modul IPA terpadu tentang siklus air dan perubahan wujud zat',
    jenjang: 'SD',
    topikIPA: 'IPA Terpadu',
    tujuanPembelajaran: 'Siswa memahami siklus air dan berbagai perubahan wujud zat',
    status: 'BERBAYAR',
    file: '/files/modul-siklus-air.pdf'
  }
];

const mockModulAccess = [
  {
    _id: '1',
    modulAjar: '1',
    nama: 'Ibu Sarah Wijaya',
    email: 'sarah@email.com',
    no_whatsapp: '081234567890',
    provinsi: 'Jawa Timur',
    jenjang_sekolah: 'SMP',
    nama_instansi: 'SMP Negeri 1 Surabaya',
    mata_pelajaran: 'IPA',
    status_ppg: 'PPG Calon Guru/PPG luar jabatan (Prajabatan)',
    sumber_informasi: 'Media Sosial (Instagram, Facebook, TikTok, X, dll.)',
    status: 'NO ACCESS',
    tanggal_pengisi: new Date('2024-11-01'),
    bukti_pembayaran: '/uploads/bukti-sarah.jpg'
  }
];

const SUMBER_INFORMASI_OPTIONS = [
  'Media Sosial (Instagram, Facebook, TikTok, X, dll.)',
  'Website Resmi Universitas / Kampus Penyelenggara',
  'Teman / Rekan Guru / Komunitas Pendidik',
  'Grup WhatsApp / Telegram / Komunitas Daring Guru',
  'Dosen / Pembimbing Kampus / Alumni PPG',
  'Seminar / Webinar Pendidikan / Workshop Daring',
  'Poster / Brosur / Pamflet Digital',
  'Iklan Internet (Google Ads / YouTube / Media Online)',
  'Dinas Pendidikan / LPTK / Sekolah Asal',
  'Lainnya'
];

export default function EditModulForm() {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    judulModul: '',
    deskripsi: '',
    jenjang: 'SD',
    topikIPA: 'Fisika',
    tujuanPembelajaran: '',
    status: 'GRATIS',
    file: "",
    cover: "",
  });

  // 🔥 Fetch ke Backend
  const fetchModulAjar = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/modul_ajar/id/${id}`
      );
      if (res.data) {
        console.log(res.data)
        setFormData(res.data)
      }
    } catch (err) {
      console.error("Failed to fetch cases:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModulAjar()
  }, [])

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileChange = async (e) => {
    e.preventDefault()
    const file = e.target.files[0];
    const formData = new FormData();
    try {
      formData.append('file', file);
      const getData = await axios.post(process.env.NEXT_PUBLIC_API_STORAGE + "/api/file", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (getData.data) {
        setFormData((e) => ({ ...e, file: getData.data }));
      }
    } catch (err) {
      console.log(err)
    }
  };

  const handleFileCoverChange = async (e) => {
    e.preventDefault()
    const file = e.target.files[0];
    const formData = new FormData();
    try {
      formData.append('file', file);
      const getData = await axios.post(process.env.NEXT_PUBLIC_API_STORAGE + "/api/file", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (getData.data) {
        setFormData((e) => ({ ...e, cover: getData.data }));
      }
    } catch (err) {
      console.log(err)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      const res = await axios.put(process.env.NEXT_PUBLIC_API_URL + "/api/modul_ajar/" + id, formData, { withCredentials: true })
      if (res) {
        alert("Update modul success")
        window.location.href = "/lgndmn/dashboard/lesson_plans"
      }
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl">
        <div className="flex">
          <Sidebar />
          <div className="w-64 bg-gray-100"></div>
          <div className="w-full">
            <div className=" w-full">
              <div className="p-4 w-[90%] mx-auto">
                <div className="max-w-7xl">
                  {/* Title */}
                  <div className="mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                      Edit Modul
                    </h1>
                  </div>
                  <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Judul Modul *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.judulModul}
                        onChange={(e) => handleChange('judulModul', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Deskripsi *
                      </label>
                      <textarea
                        required
                        value={formData.deskripsi}
                        onChange={(e) => handleChange('deskripsi', e.target.value)}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Jenjang *
                        </label>
                        <select
                          required
                          value={formData.jenjang}
                          onChange={(e) => handleChange('jenjang', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="SD">SD</option>
                          <option value="SMP">SMP</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Topik *
                        </label>
                        <select
                          required
                          value={formData.topikIPA}
                          onChange={(e) => handleChange('topikIPA', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="Fisika">Fisika</option>
                          <option value="Biologi">Biologi</option>
                          <option value="IPA">IPA</option>
                          <option value="IPAS">IPAS</option>
                          <option value="Kimia">Kimia</option>
                          <option value="Matematika">Matematika</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Status *
                        </label>
                        <select
                          required
                          value={formData.status}
                          onChange={(e) => handleChange('status', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="GRATIS">GRATIS</option>
                          <option value="BERBAYAR">BERBAYAR</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tujuan Pembelajaran *
                      </label>
                      <textarea
                        required
                        value={formData.tujuanPembelajaran}
                        onChange={(e) => handleChange('tujuanPembelajaran', e.target.value)}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        File Cover (JPG,PNG,JPEG)
                      </label>
                      <div className="flex items-center gap-4">
                        <label className="flex-1 cursor-pointer">
                          <div className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 transition flex flex-col items-center justify-center gap-2 text-gray-600">

                            <Upload size={20} />

                            {formData.cover ? (
                              <img
                                src={`${process.env.NEXT_PUBLIC_API_FILE_URL}${formData.cover}`}
                                alt="Preview Cover"
                                className="w-48 h-48 object-cover rounded-md"
                              />
                            ) : (
                              <span>Pilih file cover (JPG, PNG, JPEG)</span>
                            )}
                          </div>

                          <input
                            type="file"
                            onChange={handleFileCoverChange}
                            className="hidden"
                            name="cover"
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        File Modul (PDF)
                      </label>
                      <div className="flex items-center gap-4">
                        <label className="flex-1 cursor-pointer">
                          <div className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 transition flex items-center justify-center gap-2 text-gray-600">
                            <Upload size={20} />
                            <span>
                              {formData.file ? 'Modul sudah terpilih' : 'Pilih file modul (PDF)'}
                            </span>
                          </div>
                          <input
                            type="file"
                            accept=".pdf"
                            name="file"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="submit"
                        className="flex-1 px-6 py-3 bg-koreaBlueMuda text-white rounded-lg transition font-medium"
                      >
                        Simpan Modul
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

