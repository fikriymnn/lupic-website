"use client"
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import Editor from 'react-simple-wysiwyg';
import axios from "axios";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function Teaching_Material() {
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
  const [data3, setData3] = useState([])
  const [form, setForm] = useState({ judul: "", link: "" })
  const [form2, setForm2] = useState({ judul: "", file: "", cover: "" })
  const [form3, setForm3] = useState({ judul: "", file: "", cover: "" })
  const [file, setFile] = useState("");
  const [file2, setFile2] = useState("");
  const [file3, setFile3] = useState("");
  const [file4, setFile4] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDelete = async (id) => {
    try {
      const message = await axios.delete(process.env.NEXT_PUBLIC_API_URL + "/api/video/" + id)
      if (message.data == "success") {
        window.location.reload()
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const message = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/video/", {
        judul: form.judul,
        link: form.link
      })
      if (message.data == "success") {
        window.location.reload()
      }
    } catch (err) {
      console.log(err.message)
    }

  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setForm2((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange =  (e) => {
    e.preventDefault()
    async function getDatas(){
      try {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
  
        const getData = await axios.post(process.env.NEXT_PUBLIC_API_STORAGE + "/api/file", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        if(getData.data){
          setFile(getData.data);
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    
    getDatas()
  };

  const handleFileChange2 =  (e) => {
    e.preventDefault()
    async function getData(){
      try {
        const formData2 = new FormData();
        formData2.append('file', e.target.files[0]);
  
        const getData2 = await axios.post(process.env.NEXT_PUBLIC_API_STORAGE + "/api/file", formData2, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        if(getData2.data){
          setFile2(getData2.data);
        }
  
      } catch (error) {
        console.log(error.message)
      }
    }
    getData()
  };



  const handleDelete2 = async (id) => {
    try {
      const message = await axios.delete(process.env.NEXT_PUBLIC_API_URL + "/api/modul/" + id)
      if (message.data == "success") {
        window.location.reload()
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    try {
      console.log(file)
      if (!file) {
        alert("Pilih file terlebih dahulu! 1");
        return;
      }
      if (!file2) {
        alert("Pilih file terlebih dahulu! 2");
        return;
      }
          const message = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/modul/", {
            file: file,
            cover: file2,
            judul: form2.judul
          })
          console.log( file+file2)
          if (message.data == "success") {
            window.location.reload()
          }
      

    } catch (err) {
      console.log(err.message)
    }

  };

  const handleChange3 = (e) => {
    const { name, value } = e.target;
    setForm3((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange3 =  (e) => {
    e.preventDefault()
    async function getDatas(){
      try {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
  
        const getData = await axios.post(process.env.NEXT_PUBLIC_API_STORAGE + "/api/file", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        if(getData.data){
          setFile3(getData.data);
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    
    getDatas()
  };

  const handleFileChange4 =  (e) => {
    e.preventDefault()
    async function getData(){
      try {
        const formData2 = new FormData();
        formData2.append('file', e.target.files[0]);
  
        const getData2 = await axios.post(process.env.NEXT_PUBLIC_API_STORAGE + "/api/file", formData2, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        if(getData2.data){
          setFile4(getData2.data);
        }
  
      } catch (error) {
        console.log(error.message)
      }
    }
    getData()
  };



  const handleDelete3 = async (id) => {
    try {
      const message = await axios.delete(process.env.NEXT_PUBLIC_API_URL + "/api/paper/" + id)
      if (message.data == "success") {
        window.location.reload()
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit3 = async (e) => {
    e.preventDefault();

    try {
      console.log(file3)
      if (!file3) {
        alert("Pilih file terlebih dahulu! 3");
        return;
      }
      if (!file4) {
        alert("Pilih file terlebih dahulu! 4");
        return;
      }
          const message = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/paper/", {
            file: file3,
            cover: file4,
            judul: form3.judul
          })
          console.log( file3+file4)
          if (message.data == "success") {
            window.location.reload()
          }
      

    } catch (err) {
      console.log(err.message)
    }

  };

  useEffect(() => {
    async function getData() {
      try {
        const Data = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/video")
        const Data2 = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/modul")
        const Data3 = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/paper")
        if (Data.data) {
          setData(Data.data)
          console.log(data)
        }
        if (Data2.data) {
          setData2(Data2.data)
        }
        if (Data3.data) {
          setData3(Data3.data)
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
          <h1 className="text-3xl font-bold text-koreaBlue">ABOUT CONTENT</h1>
        </div>
        <div className="m-auto w-full">

          <div className=" m-auto bg-white p-6 rounded-lg shadow-lg w-[80%] border-2">
            <h2 className="text-3xl pt-5 font-semibold text-start mb-4">Video</h2>

            <form onSubmit={handleSubmit}>
              <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
                <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                  Judul
                </label>
                <input
                  type="text"
                  placeholder="Masukkan judul..."
                  className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="judul"
                  onChange={handleChange}
                  value={form?.judul || ""}
                />
                <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                  Link
                </label>
                <input
                  type="text"
                  placeholder="Masukkan link..."
                  className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="link"
                  onChange={handleChange}
                  value={form?.link || ""}
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Upload
              </button>
            </form>
            <div className="grid grid-cols-2 justify-items-center my-4">
              {data.map((video, index) => (
                <div key={index} className="w-[350px] bg-gray-900 text-white p-4 rounded-lg shadow-lg">
                  <ReactPlayer
                    url={video.link}
                    controls
                    width="100%"
                    height="200px"
                  />
                  <h3 className="text-lg font-semibold mt-2 line-clamp-2 ">{video.judul}</h3>
                  <button className="w-20" onClick={(e)=>handleDelete(video._id)}>
                    <p className="text-sm text-white bg-koreaRed p-2 rounded-2xl my-2">Delete</p>
                  </button>
                </div>
              ))}

            </div>
            <h2 className="text-3xl pt-5 font-semibold text-start mb-4">Modul</h2>

            <form onSubmit={handleSubmit2}>
              <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
                <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                  File
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className=""
                  id="fileInput"
                  name="file"
                />
                <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                  Judul
                </label>
                <input
                  type="text"
                  placeholder="Masukkan judul..."
                  className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="judul"
                  onChange={handleChange2}
                  value={form2?.judul || ""}
                />
                <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                  Cover
                </label>
                <input
                  type="file"
                  onChange={handleFileChange2}
                  className=""
                  id="fileInput"
                  name="file"
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                upload
              </button>
            </form>
            <div className="grid grid-cols-2 justify-items-center my-5">
              {
                data2.map((book, index) => (
                <div key={index} className= " w-[300px] bg-white shadow-lg p-4 text-center rounded-lg my-3">
                  <img src={process.env.NEXT_PUBLIC_API_FILE_URL+book.cover} alt={book.judul} className="w-full h-48 object-cover rounded-md" />
                  <h3 className="text-base line-clamp-2 font-semibold mt-2">{book.judul}</h3>
                  <a href={process.env.NEXT_PUBLIC_API_FILE_URL+book.file} download>
                    <button className="mt-2 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
                      Unduh PDF
                    </button>
                  </a>
                  <button className="w-20 ml-3" onClick={(e)=>handleDelete2(book._id)}>
                    <p className="text-sm text-white bg-koreaRed p-2 rounded-2xl">Delete</p>
                  </button>
                  
                </div>
              ))}
            </div>
            <h2 className="text-3xl pt-5 font-semibold text-start mb-4">Conference Paper</h2>

            <form onSubmit={handleSubmit3}>
              <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
                <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                  File
                </label>
                <input
                  type="file"
                  onChange={handleFileChange3}
                  className=""
                  id="fileInput"
                  name="file"
                />
                <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                  Judul
                </label>
                <input
                  type="text"
                  placeholder="Masukkan judul..."
                  className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="judul"
                  onChange={handleChange3}
                  value={form3?.judul || ""}
                />
                <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                  Cover
                </label>
                <input
                  type="file"
                  onChange={handleFileChange4}
                  className=""
                  id="fileInput"
                  name="file"
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                upload
              </button>
            </form>
            <div className="grid grid-cols-2 justify-items-center my-5">
              {
                data3.map((book, index) => (
                <div key={index} className= " w-[300px] bg-white shadow-lg p-4 text-center rounded-lg my-3">
                  <img src={process.env.NEXT_PUBLIC_API_FILE_URL+book.cover} alt={book.judul} className="w-full h-48 object-cover rounded-md" />
                  <h3 className="text-base line-clamp-2 font-semibold mt-2">{book.judul}</h3>
                  <a href={process.env.NEXT_PUBLIC_API_FILE_URL+book.file} download>
                    <button className="mt-2 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
                      Unduh PDF
                    </button>
                  </a>
                  <button className="w-20 ml-3" onClick={(e)=>handleDelete3(book._id)}>
                    <p className="text-sm text-white bg-koreaRed p-2 rounded-2xl">Delete</p>
                  </button>
                  
                </div>
              ))}
            </div>
          </div>
        </div>
      </div >

    </div >
  );
}





