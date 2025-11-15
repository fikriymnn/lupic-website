"use client"
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Editor from "react-simple-wysiwyg";
import AdminCardFacilities from "@/components/card/AdminCardFacilities";
import Image from 'next/image'
import axios from "axios";

export default function AddEvent() {
    const [file, setFile] = useState("");
    const [content, setContent] = useState('');
    const [data, setData] = useState({
        tanggal: "", judul: "", gambar: "", lokasi: "", waktu: "",
        jam: "", kategori: "", peserta: "", harga: "", content: "", sub_content: [{ sub_judul: "", sub_content: "", sub_gambar: [""] }]
    })
    const [subContent, setSubContent] = useState([{
        sub_judul: "",
        sub_content: "",
        sub_gambar: [""]
    }])

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
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!file) {
            alert("Pilih file terlebih dahulu!");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', file);

            const getData = await axios.post(process.env.NEXT_PUBLIC_API_STORAGE + "/api/file", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })


            if (getData.data) {

                const message = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/event", {
                    tanggal: data.tanggal, 
                    judul: data.judul,
                    gambar: getData.data,  
                    lokasi: data.lokasi, 
                    waktu: data.waktu,
                    jam: data.jam, 
                    kategori: data.kategori, 
                    peserta: data.peserta, 
                    harga: data.harga, 
                    content: content,
                    sub_content: subContent,
                })
                if (message.data == "success") {
                    alert("Success")
                    // window.location.reload()
                }
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="w-64"></div>
            <div className="w-full mb-16">
                <div className="p-6 mt-8 text-center">
                    <h1 className="text-3xl font-bold text-koreaBlue">ADD NEWS</h1>
                </div>
                <div className="m-auto w-full">

                    <div className=" m-auto bg-white p-6 rounded-lg shadow-lg w-[80%]">
                        <form onSubmit={handleSubmit} method="post">
                            <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                               Tanggal
                            </label>
                            <input
                                type="text"
                                placeholder="Masukkan tanggal..."
                                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                name="tanggal"
                                onChange={handleChange}
                                value={data.tanggal || ""}
                            />

                            <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                                Judul
                            </label>
                            <input
                                type="text"
                                placeholder="Masukkan nama..."
                                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                name="judul"
                                onChange={handleChange}
                                value={data.judul || ""}
                            />
                            <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                                Gambar
                            </label>
                            <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className=""
                                    id="fileInput"
                                    name="file"

                                />
                            </div>
                            <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                                Lokasi
                            </label>
                            <input
                                type="text"
                                placeholder="Masukkan nama..."
                                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                name="lokasi"
                                onChange={handleChange}
                                value={data.lokasi || ""}
                            />
                            <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                                Waktu
                            </label>
                            <input
                                type="text"
                                placeholder="Masukkan nama..."
                                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                name="waktu"
                                onChange={handleChange}
                                value={data.waktu || ""}
                            />
                            <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                                Jam
                            </label>
                            <input
                                type="text"
                                placeholder="Masukkan nama..."
                                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                name="jam"
                                onChange={handleChange}
                                value={data.jam || ""}
                            />
                            <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                                Kategori
                            </label>
                            <input
                                type="text"
                                placeholder="Masukkan nama..."
                                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                name="kategori"
                                onChange={handleChange}
                                value={data.kategori || ""}
                            />
                            <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                                Peserta
                            </label>
                            <input
                                type="text"
                                placeholder="Masukkan nama..."
                                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                name="peserta"
                                onChange={handleChange}
                                value={data.peserta || ""}
                            />
                            <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                                Harga
                            </label>
                            <input
                                type="text"
                                placeholder="Masukkan nama..."
                                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                name="harga"
                                onChange={handleChange}
                                value={data.harga || ""}
                            />
                            <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                                Content
                            </label>
                            <Editor value={content} onChange={handleContent} />



                            <div className="mt-8 mb-10">
                                {
                                    subContent && subContent.map((e, i) => {
                                        return (
                                            <div key={i} className="w-[85%] m-auto">
                                                <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                                                    Sub Judul
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Masukkan nama..."
                                                    className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                    name="sub_judul"
                                                    onChange={(a) => {
                                                        let newSubContent = [...subContent]
                                                        newSubContent[i].sub_judul = a.target.value
                                                        setSubContent(newSubContent)
                                                    }}
                                                />


                                                <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                                                    Sub Content
                                                </label>
                                                <Editor value={subContent[i].sub_content} onChange={(a) => {
                                                    let newSubContent = [...subContent]
                                                    newSubContent[i].sub_content = a.target.value
                                                    setSubContent(newSubContent)
                                                }} />
                                                <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                                                    Gambar
                                                </label>
                                                {
                                                    subContent[i].sub_gambar && subContent[i].sub_gambar.map((v, a) => {
                                                        return (
                                                            <div key={a} className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center">
                                                                <input
                                                                    type="file"
                                                                    onChange={(c) => {
                                                                        async function getData() {
                                                                            const formData = new FormData();
                                                                            formData.append('file', c.target.files[0]);

                                                                            const getData = await axios.post(process.env.NEXT_PUBLIC_API_STORAGE + "/api/file", formData, {
                                                                                headers: {
                                                                                    'Content-Type': 'multipart/form-data',
                                                                                },
                                                                            })

                                                                            if (getData.data) {
                                                                                let newSubContent = [...subContent]
                                                                                newSubContent[i].sub_gambar[a] = getData.data
                                                                                setSubContent(newSubContent)
                                                                            }

                                                                        }
                                                                        getData()
                                                                    }}
                                                                    className=""
                                                                    id="fileInput"
                                                                />
                                                            </div>
                                                        )
                                                    })
                                                }
                                                <div className="flex justify-center">
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            addGambar(i)
                                                        }}
                                                        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 w-[150px] "
                                                    >
                                                        Tambah Gambar
                                                    </button>
                                                </div>


                                            </div>
                                        )
                                    })
                                }
                                <div className="w-[85%] m-auto mt-14">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            addSubContent()
                                        }}
                                        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                                    >
                                        Tambah Sub Content
                                    </button>
                                </div>

                            </div>

                            <button
                                type="submit"
                                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                            >
                                Upload
                            </button>
                        </form>
                    </div>
                </div>
            </div >
        </div>
    );
}

