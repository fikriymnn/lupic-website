"use client"
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Editor from "react-simple-wysiwyg";
import AdminCardFacilities from "@/components/card/AdminCardFacilities";
import Image from 'next/image'

export default  function DetailNews() {
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
      <div className="w-full mb-16">
        <div className="p-6 mt-8 text-center">
          <h1 className="text-3xl font-bold text-koreaBlue">UPDATE FACILITY</h1>
        </div>
        <div className="m-auto w-full">

          <div className=" m-auto bg-white p-6 rounded-lg shadow-lg w-[80%]">
            <form>
              <h2 className="text-3xl pt-2 font-semibold text-start mb-4">Facility</h2>
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
                Gambar
              </label>
              <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center">
                <Image alt="foto" src={"/images/poster.jpg"} width={500} height={500} className="m-auto pb-5"/>
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
                Update
              </button>
            </form>
          </div>
        </div>
      </div >
    </div>
  );
}

