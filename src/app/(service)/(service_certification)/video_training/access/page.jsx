"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download, BookOpen, Edit, Trash2, Plus, Users, CheckCircle, XCircle, Upload, Filter } from 'lucide-react';

const modul =  {
    _id: '1',
    judulModul: 'Hukum Newton dan Penerapannya',
    deskripsi: 'Modul pembelajaran lengkap tentang Hukum Newton dengan pendekatan kontekstual',
    jenjang: 'SMP',
    topikIPA: 'Fisika',
    tujuanPembelajaran: 'Siswa mampu memahami dan menerapkan konsep Hukum Newton dalam kehidupan sehari-hari',
    status: 'BERBAYAR',
    file: '/files/modul-newton.pdf'
  }

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

export default function FormBukaVideo({ onBack }){
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    no_whatsapp: '',
    provinsi: '',
    jenjang_sekolah: '',
    nama_instansi: '',
    mata_pelajaran: '',
    status_ppg: '',
    sumber_informasi: [],
    sumber_informasi_lainnya: '',
    bukti_pembayaran: null
  });

  const handleChange = (field, value) => {
    setFormData({...formData, [field]: value});
  };

  const handleSumberInfoChange = (option) => {
    const current = formData.sumber_informasi;
    if (current.includes(option)) {
      setFormData({
        ...formData,
        sumber_informasi: current.filter(item => item !== option)
      });
    } else {
      setFormData({
        ...formData,
        sumber_informasi: [...current, option]
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({...formData, bukti_pembayaran: file});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Formulir berhasil dikirim! Silakan tunggu konfirmasi akses dari admin.');
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
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
              Status: <span className="font-semibold text-orange-600">{modul.status}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nama}
                  onChange={(e) => handleChange('nama', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  No. WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.no_whatsapp}
                  onChange={(e) => handleChange('no_whatsapp', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Provinsi *
                </label>
                <input
                  type="text"
                  required
                  value={formData.provinsi}
                  onChange={(e) => handleChange('provinsi', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Jenjang Sekolah *
                </label>
                <input
                  type="text"
                  required
                  value={formData.jenjang_sekolah}
                  onChange={(e) => handleChange('jenjang_sekolah', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Instansi *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nama_instansi}
                  onChange={(e) => handleChange('nama_instansi', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mata Pelajaran *
                </label>
                <input
                  type="text"
                  required
                  value={formData.mata_pelajaran}
                  onChange={(e) => handleChange('mata_pelajaran', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status PPG
                </label>
                <select
                  value={formData.status_ppg}
                  onChange={(e) => handleChange('status_ppg', e.target.value)}
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
                  <label key={index} className="flex items-start gap-3 cursor-pointer">
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
              
              {formData.sumber_informasi.includes('Lainnya') && (
                <input
                  type="text"
                  placeholder="Sebutkan sumber informasi lainnya"
                  value={formData.sumber_informasi_lainnya}
                  onChange={(e) => handleChange('sumber_informasi_lainnya', e.target.value)}
                  className="w-full mt-3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              )}
            </div>

            {modul.status === 'BERBAYAR' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bukti Pembayaran *
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex-1 cursor-pointer">
                    <div className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 transition flex items-center justify-center gap-2 text-gray-600">
                      <Upload size={20} />
                      <span>
                        {formData.bukti_pembayaran 
                          ? formData.bukti_pembayaran.name 
                          : 'Pilih file bukti pembayaran'}
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
                </div>
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
                onClick={onBack}
                className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-medium"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};