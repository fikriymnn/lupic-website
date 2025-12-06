"use client"
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import axios from "axios";
import { Trash2, Plus, Upload } from "lucide-react";

export default function Aboutus() {
  const [data, setData] = useState({
    _id: "",
    nama: "",
    deskripsi: "",
    pesan: "",
    gambar: "",
    partnerBanner: { gambar: "" },
    partner: [],
    collaboration: []
  });
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(null);

  // Upload image helper function
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_STORAGE + "/api/file",
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    );
    return response.data;
  };

  // Handle main image upload
  const handleMainImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingImage("main");
      const imageUrl = await uploadImage(file);
      setData(prev => ({ ...prev, gambar: imageUrl }));
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Failed to upload image");
    } finally {
      setUploadingImage(null);
    }
  };

  // Handle partner banner image upload
  const handlePartnerBannerChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingImage("partnerBanner");
      const imageUrl = await uploadImage(file);
      setData(prev => ({
        ...prev,
        partnerBanner: { gambar: imageUrl }
      }));
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Failed to upload image");
    } finally {
      setUploadingImage(null);
    }
  };

  // Handle partner logo upload
  const handlePartnerLogoChange = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingImage(`partner-${index}`);
      const imageUrl = await uploadImage(file);
      const updatedPartners = [...data.partner];
      updatedPartners[index].logo = imageUrl;
      setData(prev => ({ ...prev, partner: updatedPartners }));
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Failed to upload image");
    } finally {
      setUploadingImage(null);
    }
  };

  // Handle collaboration image upload
  const handleCollaborationImageChange = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingImage(`collaboration-${index}`);
      const imageUrl = await uploadImage(file);
      const updatedCollaboration = [...data.collaboration];
      updatedCollaboration[index].gambar = imageUrl;
      setData(prev => ({ ...prev, collaboration: updatedCollaboration }));
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Failed to upload image");
    } finally {
      setUploadingImage(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handlePartnerChange = (index, field, value) => {
    const updatedPartners = [...data.partner];
    updatedPartners[index][field] = value;
    setData(prev => ({ ...prev, partner: updatedPartners }));
  };

  const handleCollaborationChange = (index, field, value) => {
    const updatedCollaboration = [...data.collaboration];
    updatedCollaboration[index][field] = value;
    setData(prev => ({ ...prev, collaboration: updatedCollaboration }));
  };

  const addPartner = () => {
    setData(prev => ({
      ...prev,
      partner: [...prev.partner, { nama: "", logo: "", deskripsi: "" }]
    }));
  };

  const removePartner = (index) => {
    const updatedPartners = data.partner.filter((_, i) => i !== index);
    setData(prev => ({ ...prev, partner: updatedPartners }));
  };

  const addCollaboration = () => {
    setData(prev => ({
      ...prev,
      collaboration: [...prev.collaboration, { nama: "", gambar: "" }]
    }));
  };

  const removeCollaboration = (index) => {
    const updatedCollaboration = data.collaboration.filter((_, i) => i !== index);
    setData(prev => ({ ...prev, collaboration: updatedCollaboration }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        process.env.NEXT_PUBLIC_API_URL + "/api/aboutus/" + data._id,
        {
          gambar: data.gambar,
          nama: data.nama,
          deskripsi: data.deskripsi,
          pesan: data.pesan,
          partnerBanner: data.partnerBanner,
          partner: data.partner,
          collaboration: data.collaboration
        }
      );

      if (response.data === "success") {
        alert("Data berhasil diupdate!");
        window.location.reload();
      }
    } catch (err) {
      console.error("Error updating data:", err);
      alert("Gagal mengupdate data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/aboutus/");
        if (response.data) {
          setData({
            _id: response.data._id || "",
            nama: response.data.nama || "",
            deskripsi: response.data.deskripsi || "",
            pesan: response.data.pesan || "",
            gambar: response.data.gambar || "",
            partnerBanner: response.data.partnerBanner || { gambar: "" },
            partner: response.data.partner || [],
            collaboration: response.data.collaboration || []
          });
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }
    getData();
  }, []);

  const ImageUploadBox = ({ label, imageUrl, onFileChange, uploadingKey, inputId }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {imageUrl && (
        <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-200">
          <Image
            src={process.env.NEXT_PUBLIC_API_FILE_URL + imageUrl}
            alt={label}
            fill
            className="object-cover"
          />
        </div>
      )}
      <label
        htmlFor={inputId}
        className={`flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
          uploadingImage === uploadingKey
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
        }`}
      >
        <Upload className="w-5 h-5 text-gray-500" />
        <span className="text-sm text-gray-600">
          {uploadingImage === uploadingKey ? "Uploading..." : "Choose Image"}
        </span>
        <input
          id={inputId}
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="hidden"
          disabled={uploadingImage === uploadingKey}
        />
      </label>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="w-64"></div>
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-koreBlueMuda">About Us Content</h1>
            <p className="text-gray-600 mt-2">Manage your about us page content</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Main Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Main Information</h2>
              
              <div className="space-y-4">
                <ImageUploadBox
                  label="Main Image"
                  imageUrl={data.gambar}
                  onFileChange={handleMainImageChange}
                  uploadingKey="main"
                  inputId="mainImage"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="nama"
                    value={data.nama}
                    onChange={handleChange}
                    placeholder="Enter name..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    name="deskripsi"
                    value={data.deskripsi}
                    onChange={handleChange}
                    placeholder="Enter description..."
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    name="pesan"
                    value={data.pesan}
                    onChange={handleChange}
                    placeholder="Enter message..."
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Partner Banner Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Partner Banner</h2>
              
              <ImageUploadBox
                label="Partner Banner Image"
                imageUrl={data.partnerBanner?.gambar}
                onFileChange={handlePartnerBannerChange}
                uploadingKey="partnerBanner"
                inputId="partnerBannerImage"
              />
            </div>

            {/* Partners Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Partners</h2>
                <button
                  type="button"
                  onClick={addPartner}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <Plus className="w-4 h-4" />
                  Add Partner
                </button>
              </div>

              <div className="space-y-4">
                {data.partner.map((partner, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-gray-900">Partner {index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removePartner(index)}
                        className="text-red-600 hover:text-red-700 transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <ImageUploadBox
                      label="Partner Logo"
                      imageUrl={partner.logo}
                      onFileChange={(e) => handlePartnerLogoChange(e, index)}
                      uploadingKey={`partner-${index}`}
                      inputId={`partnerLogo-${index}`}
                    />

                    <input
                      type="text"
                      value={partner.nama}
                      onChange={(e) => handlePartnerChange(index, "nama", e.target.value)}
                      placeholder="Partner name..."
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />

                    <textarea
                      value={partner.deskripsi}
                      onChange={(e) => handlePartnerChange(index, "deskripsi", e.target.value)}
                      placeholder="Partner description..."
                      rows={2}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                    />
                  </div>
                ))}
                
                {data.partner.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No partners added yet</p>
                )}
              </div>
            </div>

            {/* Collaboration Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Collaboration</h2>
                <button
                  type="button"
                  onClick={addCollaboration}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <Plus className="w-4 h-4" />
                  Add Collaboration
                </button>
              </div>

              <div className="space-y-4">
                {data.collaboration.map((collab, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-gray-900">Collaboration {index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removeCollaboration(index)}
                        className="text-red-600 hover:text-red-700 transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <ImageUploadBox
                      label="Collaboration Image"
                      imageUrl={collab.gambar}
                      onFileChange={(e) => handleCollaborationImageChange(e, index)}
                      uploadingKey={`collaboration-${index}`}
                      inputId={`collaborationImage-${index}`}
                    />

                    <input
                      type="text"
                      value={collab.nama}
                      onChange={(e) => handleCollaborationChange(index, "nama", e.target.value)}
                      placeholder="Collaboration name..."
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>
                ))}
                
                {data.collaboration.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No collaborations added yet</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading || uploadingImage !== null}
                className={`px-8 py-3 rounded-lg font-medium text-white transition ${
                  loading || uploadingImage !== null
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}