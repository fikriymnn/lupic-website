"use client";
import { useEffect, useState } from 'react';
import { ChevronLeft, Trash2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Sidebar from "@/components/SidebarAdmin";
import axios from 'axios';

const useCase = {
  _id: '3',
  judulKasus: 'Integrasi Materi IPA: Siklus Air dan Perubahan Wujud',
  deskripsi: 'Pembelajaran IPA terpadu mengenai siklus air dengan konsep perubahan wujud zat',
  jenjang: 'SD',
  topikIPA: 'IPA Terpadu',
  kompetensiGuru: 'Pedagogik',
  narasiLengkap: 'Guru SD mengintegrasikan pembelajaran tentang siklus air dengan materi perubahan wujud zat. Melalui demonstrasi sederhana dan video animasi, siswa memahami bagaimana air menguap, mengembun, dan turun kembali sebagai hujan. Pembelajaran ini menggabungkan aspek fisika dan biologi.',
  pertanyaanAnalisis:
    'Apa keuntungan pembelajaran IPA terpadu untuk siswa SD?',
  pembahasan: 'Pembelajaran IPA terpadu membantu siswa melihat keterkaitan antar konsep sehingga lebih bermakna. Media seperti video animasi, demonstrasi langsung, dan model 3D sangat efektif untuk memvisualisasikan proses yang abstrak.',
}

export default function EditUseCase() {
  const { id } = useParams()
  const [editingUseCase, setEditingUseCase] = useState(null);
  const [formData, setFormData] = useState({
    judulKasus: '',
    deskripsi: '',
    jenjang: 'SD',
    topikIPA: 'Fisika',
    kompetensiGuru: 'Pedagogik',
    narasiLengkap: '',
    pertanyaanAnalisis: '',
    pembahasan: '',
    status:'BERBAYAR',
    harga: 0,
  });

  async function getData() {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/study_case/id/${id}`)
      if (res.data) {
        setFormData(res.data)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/study_case/${id}`, formData, { withCredentials: true })
      if (res) {
        alert("update success")
        window.location.href = "/admin/dashboard/studycase/" + id + "/edit"
      }
    } catch (err) {
      console.log(err.message)
    }
  };


  return (
    <div className="flex">
      <Sidebar />
      <div className="w-64 bg-gray-100"></div>
      <div className="w-full">

        <div className="m-auto w-full">
          <div className="min-h-screen p-4 w-[90%] m-auto">

            <div className="max-w-7xl">
              <div className="max-w-7xl">
                <div className="mb-8">
                  <h1 className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                    Edit Study Case
                  </h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="GRATIS">GRATIS</option>
                      <option value="BERBAYAR">BERBAYAR</option>
                    </select>
                  </div>
                  {
                    formData.status === 'BERBAYAR' && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                     Harga *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.harga}
                      onChange={(e) => handleChange('harga', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                      </div>
                    )
                    }
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Judul Kasus *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.judulKasus}
                      onChange={(e) => handleChange('judulKasus', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Deskripsi Singkat
                    </label>
                    <textarea
                      value={formData.deskripsi}
                      onChange={(e) => handleChange('deskripsi', e.target.value)}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="Fisika">Fisika</option>
                        <option value="Biologi">Biologi</option>
                        <option value="IPA Terpadu">IPA Terpadu</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Kompetensi Guru *
                      </label>
                      <select
                        required
                        value={formData.kompetensiGuru}
                        onChange={(e) => handleChange('kompetensiGuru', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="Pedagogik">Pedagogik</option>
                        <option value="Profesional">Profesional</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Narasi Lengkap *
                    </label>
                    <textarea
                      required
                      value={formData.narasiLengkap}
                      onChange={(e) => handleChange('narasiLengkap', e.target.value)}
                      rows="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Pertanyaan Analisis *
                      </label>
                    </div>

                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        required
                        value={formData.pertanyaanAnalisis}
                        onChange={(e) => handleChange('pertanyaanAnalisis', e.target.value)}
                        placeholder={`Pertanyaan Analisis`}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>

                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Pembahasan
                    </label>
                    <textarea
                      value={formData.pembahasan}
                      onChange={(e) => handleChange('pembahasan', e.target.value)}
                      rows="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                    >
                      Update Kasus
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
};