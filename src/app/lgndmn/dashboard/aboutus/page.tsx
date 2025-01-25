"use client"
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import Editor from 'react-simple-wysiwyg';
import AdminPartnerDropdown from "@/components/dropdown/AdminPartnerDropdown";
import axios from "axios";

export default function Aboutus() {
  const [data, setData] = useState({ _id: "",nama:"",deskripsi:"",pesan:"" })
  const [file, setFile] = useState("");
  const [currentFile, setCurrentFile] = useState("");


  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: any) => {
    setCurrentFile(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (currentFile) {
        const formData = new FormData();
        formData.append('file', currentFile);

        const getData = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/file", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        if(getData.data){
          const message = await axios.put(process.env.NEXT_PUBLIC_API_URL + "/api/aboutus/" + data._id, {
            gambar: getData.data,
            nama: data.nama,
            deskripsi: data.deskripsi,
            pesan: data.pesan
          }, {})
          if (message.data == "success") {
            window.location.reload()
          }
        }
      }else{
        const message = await axios.put(process.env.NEXT_PUBLIC_API_URL + "/api/aboutus/" + data._id, {
          gambar: file,
          nama: data.nama,
          deskripsi: data.deskripsi,
          pesan: data.pesan
        }, {})
        if (message.data == "success") {
          window.location.reload()
        }
      }

     
    } catch (err: any) {
    console.log(err.message)
  }

};

useEffect(() => {
  async function getData() {
    try {
      const Data = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/aboutus/")
      if (Data.data) {
        setFile(Data.data.gambar)
        setData(Data.data)
      }
      
    } catch (err: any) {
      console.log(err.message)
    }
  }
  getData();
}, [])

return (
  <div className="flex">
    <Sidebar />
    <div className="w-64"></div>
    <div className="w-full">
      <div className="p-6 mt-8 text-center">
        <h1 className="text-3xl font-bold text-koreaBlue">ABOUT CONTENT</h1>
      </div>
      <div className="m-auto w-full">

        <div className=" m-auto bg-white p-6 rounded-lg shadow-lg w-[80%] border-2">

          <h2 className="text-3xl pt-5 font-semibold text-start mb-4">Foto</h2>
          <Image alt="foto" src={(process.env.NEXT_PUBLIC_API_FILE_URL+file)||""} width={1000} height={500} />
          <form onSubmit={handleSubmit}>
            <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
              <input
                type="file"
                onChange={handleFileChange}
                className=""
                id="fileInput"
                name="file"
              />
              <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                Nama
              </label>
              <input
                type="text"
                placeholder="Masukkan nama..."
                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="nama"
                onChange={handleChange}
                value={data?.nama||""}
              />
              <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                Deskripsi
              </label>
              <input
                type="text"
                placeholder="Masukkan nama..."
                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="deskripsi"
                onChange={handleChange}
                value={data?.deskripsi||""}
              />
              <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                Pesan
              </label>
              <input
                type="text"
                placeholder="Masukkan nama..."
                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="pesan"
                onChange={handleChange}
                value={data?.pesan||""}
              />
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

  </div >
);
}





