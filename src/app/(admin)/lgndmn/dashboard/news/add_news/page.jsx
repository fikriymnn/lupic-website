"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Editor from "react-simple-wysiwyg";
import axios from "axios";
import imageCompression from 'browser-image-compression';

export default function AddNews() {
    const [file, setFile] = useState("");
    const [content, setContent] = useState('');
    const [uploading, setUploading] = useState(false); // State untuk loading
    const [data, setData] = useState({
        judul: "", deskripsi: "", gambar: "", sub_content: [{ sub_judul: "", sub_content: "", sub_gambar: [""] }], tanggal: "", author: "", content: ""
    })
    const [subContent, setSubContent] = useState([{
        sub_judul: "",
        sub_content: "",
        sub_gambar: [""]
    }])

    // Fungsi untuk resize image
    const compressImage = async (imageFile) => {
        const options = {
            maxSizeMB: 0.5,        // Maksimal ukuran 500KB
            maxWidthOrHeight: 1200, // Maksimal lebar/tinggi 1200px
            useWebWorker: true,     // Menggunakan web worker untuk performa lebih baik
            fileType: 'image/jpeg', // Konversi ke JPEG (opsional)
            initialQuality: 0.8,    // Kualitas 80%
        };

        try {
            const compressedFile = await imageCompression(imageFile, options);
            console.log('Original size:', imageFile.size / 1024 / 1024, 'MB');
            console.log('Compressed size:', compressedFile.size / 1024 / 1024, 'MB');
            return compressedFile;
        } catch (error) {
            console.error('Error compressing image:', error);
            throw error;
        }
    };

    // Fungsi upload file dengan resize
    const uploadFile = async (fileToUpload) => {
        try {
            // Resize image terlebih dahulu
            const compressedImage = await compressImage(fileToUpload);
            
            const formData = new FormData();
            formData.append('file', compressedImage);

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_STORAGE}/api/file`, 
                formData, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    timeout: 30000, // Timeout 30 detik
                }
            );
            
            return response.data;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    function handleContent(e) {
        setContent(e.target.value)
    }

    function addSubContent() {
        setSubContent([...subContent, {
            sub_judul: "",
            sub_content: "",
            sub_gambar: [""]
        }])
    }

    function addGambar(i) {
        let newContent = [...subContent]
        newContent[i].sub_gambar = [...newContent[i].sub_gambar, ""]
        setSubContent([...newContent])
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Validasi tipe file
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            if (!validTypes.includes(selectedFile.type)) {
                alert('Format file harus JPG, JPEG, PNG, atau WEBP');
                return;
            }
            
            // Validasi ukuran awal (max 10MB sebelum kompresi)
            if (selectedFile.size > 10 * 1024 * 1024) {
                alert('Ukuran file terlalu besar! Maksimal 10MB sebelum kompresi');
                return;
            }
            
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!file) {
            alert("Pilih file gambar terlebih dahulu!");
            return;
        }

        setUploading(true);

        try {
            // Upload file utama dengan resize
            const uploadedImagePath = await uploadFile(file);
            
            if (uploadedImagePath) {
                // Upload semua gambar sub content secara paralel
                const subContentWithImages = await Promise.all(
                    subContent.map(async (section, idx) => {
                        const uploadedSubImages = await Promise.all(
                            section.sub_gambar.map(async (gambarUrl, imgIdx) => {
                                // Jika gambar masih berupa file (belum diupload)
                                if (gambarUrl && typeof gambarUrl === 'object' && gambarUrl instanceof File) {
                                    try {
                                        return await uploadFile(gambarUrl);
                                    } catch (error) {
                                        console.error(`Error uploading sub image ${idx}-${imgIdx}:`, error);
                                        return "";
                                    }
                                }
                                // Jika sudah berupa URL/path
                                return gambarUrl;
                            })
                        );
                        
                        return {
                            ...section,
                            sub_gambar: uploadedSubImages.filter(img => img !== "")
                        };
                    })
                );

                // Kirim data ke API news
                const newsData = {
                    author: data.author,
                    judul: data.judul,
                    gambar: uploadedImagePath,
                    deskripsi: data.deskripsi,
                    content: content,
                    sub_content: subContentWithImages,
                    tanggal: data.tanggal
                };
                
                console.log("Sending news data:", newsData);
                
                const message = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/news`,
                    newsData
                );
                
                if (message.data === "success" || message.data?.success === true) {
                    alert("Berhasil menambahkan berita!");
                    // Reset form
                    setFile("");
                    setContent("");
                    setData({
                        judul: "", deskripsi: "", gambar: "", sub_content: [], tanggal: "", author: "", content: ""
                    });
                    setSubContent([{
                        sub_judul: "",
                        sub_content: "",
                        sub_gambar: [""]
                    }]);
                    // Redirect atau reload
                    window.location.href = "/lgndmn/dashboard/news";
                } else {
                    alert(message.data?.message || "Gagal menambahkan berita");
                }
            }
        } catch (err) {
            console.error("Error detail:", err);
            alert(err.response?.data?.message || err.message || "Terjadi kesalahan saat menambahkan berita");
        } finally {
            setUploading(false);
        }
    };

    // Fungsi untuk handle file sub content
    const handleSubFileChange = async (i, a, file) => {
        if (file) {
            // Simpan file object untuk diupload nanti di handleSubmit
            let newSubContent = [...subContent];
            newSubContent[i].sub_gambar[a] = file; // Simpan file object, bukan langsung upload
            setSubContent(newSubContent);
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="w-64"></div>
            <div className="w-full mb-16">
                <div className="p-6 mt-8 text-center">
                    <h1 className="text-3xl font-bold text-koreaBlue">ADD NEWS</h1>
                </div>
                <div className="m-auto w-full">
                    <div className="m-auto bg-white p-6 rounded-lg shadow-lg w-[80%]">
                        <form onSubmit={handleSubmit} method="post">
                            <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                                Nama Author
                            </label>
                            <input
                                type="text"
                                placeholder="Masukkan nama..."
                                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                name="author"
                                onChange={handleChange}
                                value={data.author || ""}
                                required
                            />
                            
                            <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                                Tanggal
                            </label>
                            <input
                                type="text"
                                placeholder="Masukkan tanggal (DD/MM/YYYY) => 2/1/2025 ..."
                                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                name="tanggal"
                                onChange={handleChange}
                                value={data.tanggal || ""}
                                required
                            />

                            <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                                Judul
                            </label>
                            <input
                                type="text"
                                placeholder="Masukkan judul..."
                                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                name="judul"
                                onChange={handleChange}
                                value={data.judul || ""}
                                required
                            />
                            
                            <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                                Gambar Utama
                            </label>
                            <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className=""
                                    id="fileInput"
                                    name="file"
                                    accept="image/jpeg,image/jpg,image/png,image/webp"
                                    required
                                />
                                {file && (
                                    <p className="text-sm text-green-600 mt-2">
                                        File siap: {(file.size / 1024).toFixed(2)} KB
                                    </p>
                                )}
                            </div>
                            
                            <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                                Deskripsi
                            </label>
                            <input
                                type="text"
                                placeholder="Masukkan deskripsi..."
                                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                name="deskripsi"
                                onChange={handleChange}
                                value={data.deskripsi || ""}
                                required
                            />
                            
                            <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                                Content
                            </label>
                            <Editor value={content} onChange={handleContent} />

                            <div className="mt-8 mb-10">
                                {subContent && subContent.map((e, i) => {
                                    return (
                                        <div key={i} className="w-[85%] m-auto border-t pt-4 mt-4">
                                            <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                                                Sub Judul {i + 1}
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Masukkan sub judul..."
                                                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                name="sub_judul"
                                                onChange={(a) => {
                                                    let newSubContent = [...subContent]
                                                    newSubContent[i].sub_judul = a.target.value
                                                    setSubContent(newSubContent)
                                                }}
                                            />

                                            <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                                                Sub Content {i + 1}
                                            </label>
                                            <Editor 
                                                value={subContent[i].sub_content} 
                                                onChange={(a) => {
                                                    let newSubContent = [...subContent]
                                                    newSubContent[i].sub_content = a.target.value
                                                    setSubContent(newSubContent)
                                                }} 
                                            />
                                            
                                            <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                                                Gambar Sub Content {i + 1}
                                            </label>
                                            {subContent[i].sub_gambar && subContent[i].sub_gambar.map((v, a) => {
                                                return (
                                                    <div key={a} className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center mb-2">
                                                        <input
                                                            type="file"
                                                            onChange={(c) => {
                                                                if (c.target.files[0]) {
                                                                    handleSubFileChange(i, a, c.target.files[0]);
                                                                }
                                                            }}
                                                            className=""
                                                            id="fileInput"
                                                            accept="image/jpeg,image/jpg,image/png,image/webp"
                                                        />
                                                        {v && typeof v === 'object' && v instanceof File && (
                                                            <p className="text-sm text-green-600 mt-1">
                                                                File siap: {(v.size / 1024).toFixed(2)} KB
                                                            </p>
                                                        )}
                                                    </div>
                                                )
                                            })}
                                            
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        addGambar(i)
                                                    }}
                                                    className="mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 px-4"
                                                >
                                                    Tambah Gambar ke Sub Content {i + 1}
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })}
                                
                                <div className="w-[85%] m-auto mt-14">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            addSubContent()
                                        }}
                                        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                                    >
                                        Tambah Sub Content Baru
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={uploading}
                                className={`mt-4 w-full text-white py-2 rounded-lg transition duration-200 ${
                                    uploading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                                }`}
                            >
                                {uploading ? 'Mengupload...' : 'Upload'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}