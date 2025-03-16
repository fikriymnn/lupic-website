"use client"
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Editor from "react-simple-wysiwyg";
import AdminCardFacilities from "@/components/card/AdminCardFacilities";
import Image from 'next/image'
import axios from "axios";
import { use } from "react";

export default function EditNews({ params }) {
    const { id } = use(params)
    const [file, setFile] = useState("");
    const [content, setContent] = useState('');
    const [data, setData] = useState({
        judul: "", deskripsi: "", gambar: "", sub_content: [{ sub_judul: "", sub_content: "", sub_gambar: [""] }], tanggal: "", author: "", content: ""
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
        console.log("tes")
        try {
            console.log("tes")

            if (file) {
                const formData = new FormData();
                formData.append('file', file);

                const getData = await axios.post(process.env.NEXT_PUBLIC_API_STORAGE + "/api/file", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })

                if (getData) {
                    const message = await axios.put(process.env.NEXT_PUBLIC_API_URL + "/api/news/" + id, {
                        author: data.author,
                        judul: data.judul,
                        gambar: getData.data,
                        deskripsi: data.deskripsi,
                        content: content,
                        sub_content: subContent,
                        tanggal: data.tanggal
                    })
                    if (message.data == "success") {
                        alert("Success")
                        window.location.reload()
                    }
                }
            } else {
                console.log(88)
                const message = await axios.put(process.env.NEXT_PUBLIC_API_URL + "/api/news/" + id, {
                    author: data.author,
                    judul: data.judul,
                    gambar: data.gambar,
                    deskripsi: data.deskripsi,
                    content: content,
                    sub_content: subContent,
                    tanggal: data.tanggal
                })
                console.log(message)
                if (message.data == "success") {
                    alert("Success")
                    window.location.reload()
                }
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        async function getData() {
            try {
                const Data = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/news/" + id)
                if (Data.data) {
                    setData(Data.data)
                    setContent(Data.data.content)
                    setSubContent(Data.data.sub_content)
                }

            } catch (err) {
                console.log(err.message)
            }
        }
        getData()
    }, [])

    return (
        <div className="flex">
            <Sidebar />
            <div className="w-64"></div>
            <div className="w-full mb-16">
                <div className="p-6 mt-8 text-center">
                    <h1 className="text-3xl font-bold text-koreaBlue">UPDATE NEWS</h1>
                </div>
                <div className="m-auto w-full">

                    <div className=" m-auto bg-white p-6 rounded-lg shadow-lg w-[80%]">
                        <form onSubmit={handleSubmit}>
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
                            />
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
                            <img alt="foto" src={`${process.env.NEXT_PUBLIC_API_FILE_URL}` + data.gambar} className="w-[800px] h-[400px] m-auto py-5" />
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
                                Deskripsi
                            </label>
                            <input
                                type="text"
                                placeholder="Masukkan nama..."
                                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                name="deskripsi"
                                onChange={handleChange}
                                value={data.deskripsi || ""}
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
                                                    value={e.sub_judul}
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
                                                                <img alt="foto" src={`${process.env.NEXT_PUBLIC_API_FILE_URL}` + v} className=" m-auto py-5 w-full" />
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
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div >
        </div>
    );
}

