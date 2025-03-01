"use client"
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Editor from "react-simple-wysiwyg";
import AdminCardFacilities from "@/components/card/AdminCardFacilities";
import Image from 'next/image'
import axios from "axios";
import { use } from "react";

export default  function FacilitiesAdmin({params}) {
  const {id} = use(params)
  const [form, setForm] = useState({ judul: "",gambar: "",deskripsi:"" })
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
  
        const getData = await axios.post(process.env.NEXT_PUBLIC_API_STORAGE + "/api/file", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        if (getData.data) {
          const message = await axios.put(process.env.NEXT_PUBLIC_API_URL + "/api/facility/"+id, {
            gambar: getData.data,
            judul: form.judul,
            deskripsi: form.deskripsi,
            content:content
          })
          if (message.data == "success") {
            window.location.reload()
          }
        }
      }else{
          const message = await axios.put(process.env.NEXT_PUBLIC_API_URL + "/api/facility/"+id, {
            gambar: form.gambar,
            judul: form.judul,
            deskripsi: form.deskripsi,
            content:content
          })
          if (message.data == "success") {
            window.location.reload()
          }
      }

      
    } catch (err) {
      console.log(err.message)
    }

  };

  useEffect(() => {
    async function getData() {
      try {
        const Data = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/facility/"+id)
        if (Data.data) {
          setForm(Data.data)
          setContent(Data.data.content)
        }

      } catch (err) {
        console.log(err.message)
      }
    }
    getData();
  }, [])
    
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-64"></div>
      <div className="w-full mb-16">
        <div className="p-6 mt-8 text-center">
          <h1 className="text-3xl font-bold text-koreaBlue">EDIT FACILITY</h1>
        </div>
        <div className="m-auto w-full">

          <div className=" m-auto bg-white p-6 rounded-lg shadow-lg w-[80%]">
            <form onSubmit={handleSubmit}>
              <h2 className="text-3xl pt-2 font-semibold text-start mb-4">Facility</h2>
              <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                Judul
              </label>
              <input
                type="text"
                placeholder="Masukkan nama..."
                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="judul"
                onChange={handleChange}
                value={form.judul}
              />
              <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                Deksripsi
              </label>
              <input
                type="text"
                placeholder="Masukkan nama..."
                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="deskripsi"
                onChange={handleChange}
                value={form.deskripsi}
              />
              <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                Content
              </label>
              <Editor value={content} onChange={handleContent} />
              <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                Gambar
              </label>
              <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center">
                <Image alt="foto" src={process.env.NEXT_PUBLIC_API_FILE_URL +form.gambar} width={500} height={500} className="m-auto pb-5"/>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className=""
                  id="fileInput"
                  name="file"
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
    </div>
  );
}

