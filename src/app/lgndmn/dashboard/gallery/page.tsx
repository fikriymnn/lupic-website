"use client"
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Editor from "react-simple-wysiwyg";
import AdminCardFacilities from "@/components/card/AdminCardFacilities";
import axios from "axios";
import Image from "next/image";

export default function FacilitiesAdmin() {
  const [data, setData] = useState([{ gambar: "", deskripsi: "" }])
  const [form, setForm] = useState({ gambar: "", deskripsi: "" })
  const [file, setFile] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleDelete = async (id:any)=>{
    try{
      const message = await axios.delete(process.env.NEXT_PUBLIC_API_URL+"/api/gallery/"+id)
      if(message.data=="success"){
        window.location.reload()
      }
    }catch(err:any){
      console.log(err)
    }
  }


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (!file) {
        alert("Pilih file terlebih dahulu!");
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      const getData = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/file", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (getData.data) {
        const message = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/gallery/", {
          gambar: getData.data,
          deskripsi: form.deskripsi
        })
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
        const Data = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/gallery/")
        if (Data.data) {
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
          <h1 className="text-3xl font-bold text-koreaBlue">FACILITIES CONTENT</h1>
        </div>
        <div className="m-auto w-full">

          <div className=" m-auto bg-white p-6 rounded-lg shadow-lg w-[80%] border-2">
            <form onSubmit={handleSubmit}>
              <h2 className="text-3xl pt-2 font-semibold text-start mb-4">Facility</h2>
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
              <h3 className="text-2xl font-bold text-center mt-14 mb-4">List Facility</h3>
            </div>
            <div className="grid grid-cols-2 justify-items-center m-auto align-items-center items-center">
              {
                data && data.map((v:any, i:any) => {
                  return (
                    <div className="grid grid-cols-1  justify-items-center w-[450px] mx-4" key={i}>
                      <Image className="mx-6 py-5" alt="foto" src={process.env.NEXT_PUBLIC_API_FILE_URL + v.gambar} width={300} height={300} />
                      <p className="text-xs mx-3 px-3">{v.deskripsi}</p>
                      <button className="w-20 m-auto w-[80%] mt-3" onClick={(e) => handleDelete(v._id)}>
                        <p className="text-sm text-center m-auto text-white bg-koreaRed p-2 rounded-2xl">Delete</p>
                      </button>
                    </div>
                  )
                })
              }
            </div>


          </div>
        </div>
      </div >
    </div>
  );
}

