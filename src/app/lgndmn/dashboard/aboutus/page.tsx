"use client"
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import Editor from 'react-simple-wysiwyg';
import AdminPartnerDropdown from "@/components/dropdown/AdminPartnerDropdown";

export default function Aboutus() {
  const [file, setFile] = useState({ name: "" });
  const [html, setHtml] = useState('my <b>HTML</b>');

  function onChange(e: any) {
    setHtml(e.target.value);
  }

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!file) {
      alert("Pilih file terlebih dahulu!");
      return;
    }
    console.log("File uploaded:", file);
  };

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

            <h2 className="text-3xl pt-5 font-semibold text-start mb-4">Poster Partner</h2>
            <Image alt="foto" src={"/images/poster.jpg"} width={1000} height={500} />
            <form>
              <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className=""
                  id="fileInput"
                />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer text-blue-500 hover:underline"
                >
                  {file ? file?.name : "Pilih file untuk diunggah"}
                </label>
              </div>
              <button
                type="submit"
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Upload
              </button>
            </form>
            <form>
              <h2 className="text-3xl pt-14 font-semibold text-start mb-4">List Partner</h2>
              <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                Nama
              </label>
              <input
                type="text"
                placeholder="Masukkan nama..."
                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                Deskripsi
              </label>
              <Editor value={html} onChange={onChange} />
              <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                Logo
              </label>
              <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className=""
                  id="fileInput"
                />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer text-blue-500 hover:underline"
                >
                  {file ? file?.name : "Pilih file untuk diunggah"}
                </label>
              </div>

              <button
                type="submit"
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Tambahkan
              </button>
            </form>
            <div>
              <AdminPartnerDropdown/>
            </div>


          </div>
        </div>
      </div >

    </div >
  );
}





