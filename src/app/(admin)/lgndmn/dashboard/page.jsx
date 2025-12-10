"use client"
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import axios from "axios";
import { Upload, X, Save, Loader2, Image as ImageIcon, FileText } from 'lucide-react';

export default function HomeContent() {
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // State untuk semua field
  const [heroSection, setHeroSection] = useState("");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [heroPartner, setHeroPartner] = useState("");
  const [footerPartner, setFooterPartner] = useState("");
  const [carousel, setCarousel] = useState([]);
  
  // State untuk file upload
  const [fileHeroSection, setFileHeroSection] = useState(null);
  const [fileHeroPartner, setFileHeroPartner] = useState(null);
  const [fileFooterPartner, setFileFooterPartner] = useState(null);
  const [fileCarousel, setFileCarousel] = useState(null);
  
  // Loading state untuk setiap section
  const [uploadingHeroSection, setUploadingHeroSection] = useState(false);
  const [uploadingHeroPartner, setUploadingHeroPartner] = useState(false);
  const [uploadingFooterPartner, setUploadingFooterPartner] = useState(false);
  const [uploadingCarousel, setUploadingCarousel] = useState(false);

  // Get initial data
  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/home");
        const data = response.data;
        
        setId(data._id);
        setHeroSection(data.hero_section || "");
        setHeroTitle(data.hero_title || "");
        setHeroDescription(data.hero_description || "");
        setHeroPartner(data.hero_partner || "");
        setFooterPartner(data.footer_partner || "");
        setCarousel(Array.isArray(data.carousel) ? data.carousel : []);
        
        console.log("Data loaded:", data);
      } catch (err) {
        console.log("Error loading data:", err.message);
        alert("Gagal memuat data!");
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  // Upload file helper
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_STORAGE + "/api/file", 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    
    return response.data;
  };

  // Update data helper
  const updateHomeData = async (updates) => {
    await axios.put(
      process.env.NEXT_PUBLIC_API_URL + "/api/home/" + id,
      {
        hero_section: heroSection,
        carousel: carousel,
        hero_partner: heroPartner,
        footer_partner: footerPartner,
        hero_title: heroTitle,
        hero_description: heroDescription,
        ...updates
      }
    );
  };

  // Handle Hero Section Upload
  const handleHeroSectionSubmit = async (e) => {
    e.preventDefault();
    if (!fileHeroSection) {
      alert("Pilih file terlebih dahulu!");
      return;
    }
    
    setUploadingHeroSection(true);
    try {
      const uploadedFile = await uploadFile(fileHeroSection);
      await updateHomeData({ hero_section: uploadedFile });
      setHeroSection(uploadedFile);
      setFileHeroSection(null);
      alert("Hero Section berhasil diupdate!");
    } catch (err) {
      console.log(err.message);
      alert("Gagal mengupdate Hero Section!");
    } finally {
      setUploadingHeroSection(false);
    }
  };

  // Handle Hero Partner Upload
  const handleHeroPartnerSubmit = async (e) => {
    e.preventDefault();
    if (!fileHeroPartner) {
      alert("Pilih file terlebih dahulu!");
      return;
    }
    
    setUploadingHeroPartner(true);
    try {
      const uploadedFile = await uploadFile(fileHeroPartner);
      await updateHomeData({ hero_partner: uploadedFile });
      setHeroPartner(uploadedFile);
      setFileHeroPartner(null);
      alert("Hero Partner berhasil diupdate!");
    } catch (err) {
      console.log(err.message);
      alert("Gagal mengupdate Hero Partner!");
    } finally {
      setUploadingHeroPartner(false);
    }
  };

  // Handle Footer Partner Upload
  const handleFooterPartnerSubmit = async (e) => {
    e.preventDefault();
    if (!fileFooterPartner) {
      alert("Pilih file terlebih dahulu!");
      return;
    }
    
    setUploadingFooterPartner(true);
    try {
      const uploadedFile = await uploadFile(fileFooterPartner);
      await updateHomeData({ footer_partner: uploadedFile });
      setFooterPartner(uploadedFile);
      setFileFooterPartner(null);
      alert("Footer Partner berhasil diupdate!");
    } catch (err) {
      console.log(err.message);
      alert("Gagal mengupdate Footer Partner!");
    } finally {
      setUploadingFooterPartner(false);
    }
  };

  // Handle Text Update (Hero Title & Description)
  const handleTextUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateHomeData({
        hero_title: heroTitle,
        hero_description: heroDescription
      });
      alert("Text berhasil diupdate!");
    } catch (err) {
      console.log(err.message);
      alert("Gagal mengupdate text!");
    } finally {
      setSaving(false);
    }
  };

  // Handle Carousel Upload
  const handleCarouselSubmit = async (e) => {
    e.preventDefault();
    if (!fileCarousel) {
      alert("Pilih file terlebih dahulu!");
      return;
    }
    
    setUploadingCarousel(true);
    try {
      const uploadedFile = await uploadFile(fileCarousel);
      const newCarousel = [...carousel, uploadedFile];
      await updateHomeData({ carousel: newCarousel });
      setCarousel(newCarousel);
      setFileCarousel(null);
      alert("Carousel berhasil ditambahkan!");
    } catch (err) {
      console.log(err.message);
      alert("Gagal menambahkan carousel!");
    } finally {
      setUploadingCarousel(false);
    }
  };

  // Handle Carousel Delete
  const handleCarouselDelete = async (index) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus gambar ini?")) {
      return;
    }
    
    try {
      const newCarousel = [...carousel];
      newCarousel.splice(index, 1);
      await updateHomeData({ carousel: newCarousel });
      setCarousel(newCarousel);
      alert("Carousel berhasil dihapus!");
    } catch (err) {
      console.log(err.message);
      alert("Gagal menghapus carousel!");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="w-64 flex-shrink-0"></div>
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="w-64 flex-shrink-0"></div>
      
      <div className="flex-1 p-6 lg:p-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
            Home Content Management
          </h1>
          <p className="text-gray-600">Kelola konten halaman home website</p>
        </div>

        <div className="space-y-6">
          {/* Hero Title & Description Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Hero Text Content</h2>
                <p className="text-sm text-gray-600">Judul dan deskripsi hero section</p>
              </div>
            </div>

            <form onSubmit={handleTextUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hero Title
                </label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Masukkan judul hero section..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hero Description
                </label>
                <textarea
                  value={heroDescription}
                  onChange={(e) => setHeroDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  rows="4"
                  placeholder="Masukkan deskripsi hero section..."
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Simpan Text
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Hero Section Image */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Hero Section Image</h2>
                <p className="text-sm text-gray-600">Gambar utama hero section</p>
              </div>
            </div>

            {heroSection && (
              <div className="mb-6 rounded-lg overflow-hidden border border-gray-200">
                <Image 
                  alt="Hero Section" 
                  src={`${process.env.NEXT_PUBLIC_API_FILE_URL}${heroSection}`} 
                  width={1000} 
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            )}

            <form onSubmit={handleHeroSectionSubmit} className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  onChange={(e) => setFileHeroSection(e.target.files[0])}
                  className="w-full"
                  accept="image/*"
                />
              </div>
              <button
                type="submit"
                disabled={uploadingHeroSection}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                {uploadingHeroSection ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Mengupload...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Update Hero Section
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Hero Partner Image */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Hero Partner Image</h2>
                <p className="text-sm text-gray-600">Gambar partner di hero section</p>
              </div>
            </div>

            {heroPartner && (
              <div className="mb-6 rounded-lg overflow-hidden border border-gray-200">
                <Image 
                  alt="Hero Partner" 
                  src={`${process.env.NEXT_PUBLIC_API_FILE_URL}${heroPartner}`} 
                  width={800} 
                  height={300}
                  className="w-full h-auto"
                />
              </div>
            )}

            <form onSubmit={handleHeroPartnerSubmit} className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  onChange={(e) => setFileHeroPartner(e.target.files[0])}
                  className="w-full"
                  accept="image/*"
                />
              </div>
              <button
                type="submit"
                disabled={uploadingHeroPartner}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                {uploadingHeroPartner ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Mengupload...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Update Hero Partner
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer Partner Image */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Footer Partner Image</h2>
                <p className="text-sm text-gray-600">Gambar partner di footer</p>
              </div>
            </div>

            {footerPartner && (
              <div className="mb-6 rounded-lg overflow-hidden border border-gray-200">
                <Image 
                  alt="Footer Partner" 
                  src={`${process.env.NEXT_PUBLIC_API_FILE_URL}${footerPartner}`} 
                  width={800} 
                  height={300}
                  className="w-full h-auto"
                />
              </div>
            )}

            <form onSubmit={handleFooterPartnerSubmit} className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  onChange={(e) => setFileFooterPartner(e.target.files[0])}
                  className="w-full"
                  accept="image/*"
                />
              </div>
              <button
                type="submit"
                disabled={uploadingFooterPartner}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                {uploadingFooterPartner ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Mengupload...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Update Footer Partner
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Carousel Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Carousel Images</h2>
                <p className="text-sm text-gray-600">Kelola gambar carousel</p>
              </div>
            </div>

            <form onSubmit={handleCarouselSubmit} className="space-y-4 mb-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors">
                <input
                  type="file"
                  onChange={(e) => setFileCarousel(e.target.files[0])}
                  className="w-full"
                  accept="image/*"
                />
              </div>
              <button
                type="submit"
                disabled={uploadingCarousel}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                {uploadingCarousel ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Mengupload...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Tambah ke Carousel
                  </>
                )}
              </button>
            </form>

            {/* Carousel Grid */}
            {carousel.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {carousel.map((img, index) => (
                  <div key={index} className="relative group rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                    <Image 
                      alt={`Carousel ${index + 1}`}
                      src={`${process.env.NEXT_PUBLIC_API_FILE_URL}${img}`}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                      <button
                        onClick={() => handleCarouselDelete(index)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 hover:bg-red-700 text-white p-3 rounded-full"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      #{index + 1}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <ImageIcon className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p>Belum ada gambar carousel</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}