"use client"
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

export default function Dashboard() {
  const [file, setFile] = useState({ name: "" });
  const [file2, setFile2] = useState({ name: "" });
  const [file3, setFile3] = useState({ name: "" });

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };
  const handleFileChange2 = (e: any) => {
    setFile2(e.target.files[0]);
  };
  const handleFileChange3 = (e: any) => {
    setFile3(e.target.files[0]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!file) {
      alert("Pilih file terlebih dahulu!");
      return;
    }
    console.log("File uploaded:", file);
  };
  const handleSubmit2 = (e: any) => {
    e.preventDefault();
    if (!file2) {
      alert("Pilih file terlebih dahulu!");
      return;
    }
    console.log("File uploaded:", file2);
  };
  const handleSubmit3 = (e: any) => {
    e.preventDefault();
    if (!file3) {
      alert("Pilih file terlebih dahulu!");
      return;
    }
    console.log("File uploaded:", file3);
  };
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-64"></div>
      <div className="w-full">
          <div className="p-6 mt-8 text-center">
              <h1 className="text-3xl font-bold text-koreaBlue">HOME CONTENT</h1>
          </div>
          <div className="m-auto w-full">

              <div className=" m-auto bg-white p-6 rounded-lg shadow-lg w-[80%] border-2">

                <h2 className="text-3xl pt-5 font-semibold text-start mb-4">Foto Hero Section</h2>
                <Image alt="foto" src={"/images/poster.jpg"} width={1000} height={500}/>
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

                <h2 className="mt-16 text-3xl font-semibold text-start mb-4">Carousel</h2>
                <form>
                <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center">
                    <input
                      type="file"
                      onChange={handleFileChange2}
                      className=""
                      id="fileInput"
                    />
                    <label
                      htmlFor="fileInput"
                      className="cursor-pointer text-blue-500 hover:underline"
                    >
                      {file2 ? file2?.name : "Pilih file untuk diunggah"}
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 mb-5"
                  >
                    Upload
                  </button>
                </form>
                <div className="flex justify-evently m-auto">
                  <div className="grid grid-cols-1 justify-items-center">
                  <Image className="mx-6 py-5" alt="foto" src={"/images/poster.jpg"} width={300} height={300}/>
                  <button className="w-20 m-auto w-[80%]" onClick={(e) => { alert("hapus") }}>
                    <p className="text-sm text-center m-auto text-white bg-koreaRed p-2 rounded-2xl">Delete</p>
                </button>
                  </div>
                 
                </div>
               
              </div>
          </div>
      </div>
      
    </div>
  );
}



