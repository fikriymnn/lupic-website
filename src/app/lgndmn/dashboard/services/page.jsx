"use client"
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Editor from "react-simple-wysiwyg";
import AdminCardFacilities from "@/components/card/AdminCardFacilities";
import axios from "axios";
import AdminCardToko from "@/components/card/AdminCardToko";
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

export default function ServicesAdmin() {
  const [data, setData] = useState([])
  const [form, setForm] = useState({ judul: "", gambar: "", deskripsi: "", harga: 0, link_shopee: "", link_tokped: "", content: "" })
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPage] = useState(1)

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
      if (!file) {
        alert("Pilih file terlebih dahulu!");
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      const getData = await axios.post(process.env.NEXT_PUBLIC_API_STORAGE + "/api/file", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (getData.data) {
        const message = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/toko/", {
          gambar: getData.data,
          judul: form.judul,
          harga: form.harga,
          link_shopee: form.link_shopee,
          link_tokped: form.link_tokped,
          deskripsi: form.deskripsi,
          content: content
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
        const Data = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/toko?limit=8&page=" + currentPage)
        console.log(Data)
        if (Data.data) {
          setData(Data.data)
          setContent(Data.data.content)
        }
        const Data2 = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/toko?count=12")
        if (Data2.data) {
          setTotalPage(Data2.data/8)
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
      <div className="w-full">
        <div className="p-6 mt-8 text-center">
          <h1 className="text-3xl font-bold text-koreaBlue">Service Toko</h1>
        </div>
        <div className="m-auto w-full">

          <div className=" m-auto bg-white p-6 rounded-lg shadow-lg w-[80%] border-2">
            <form onSubmit={handleSubmit}>
              <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                Nama
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
                Harga
              </label>
              <input
                type="number"
                placeholder="Masukkan nama..."
                className="mt-2 w-[30%] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="harga"
                onChange={handleChange}
                value={form.harga}
              />
              <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                Link Shopee
              </label>
              <input
                type="text"
                placeholder="Masukkan nama..."
                className="mt-2 w-[30%] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="link_shopee"
                onChange={handleChange}
                value={form.link_shopee}
              />
              <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                Link Tokped
              </label>
              <input
                type="text"
                placeholder="Masukkan nama..."
                className="mt-2 w-[30%] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="link_tokped"
                onChange={handleChange}
                value={form.link_tokped}
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
                Tambahkan
              </button>
            </form>
            <div>
              <h3 className="text-2xl font-bold text-center mt-14 mb-4">List</h3>
            </div>
            <div className="grid grid-cols-2 justify-items-center">
              {
                data.map((v, i) => {
                  return (
                    <AdminCardToko key={i} judul={v.judul} deskripsi={v.deskripsi} id={v._id} gambar={v.gambar} harga={v.harga} />
                  )
                })
              }
            </div>
            <div className="w-[20%] m-auto mt-10 mb-16">
              <ResponsivePagination
                current={currentPage}
                total={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>

          </div>
        </div>
      </div >
    </div>
  );
}

