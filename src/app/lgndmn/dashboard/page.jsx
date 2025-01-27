"use client"
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import axios from "axios";

export default function Dashboard() {
  const [id,setId] = useState(null)
  const [file, setFile] = useState("");
  const [file2, setFile2] = useState([]);
  const [fileHero, setFileHero] = useState("");
  const [fileCarousel, setFileCarousel] = useState(null);
  

  const handleFileChange = (e) => {
    e.preventDefault();
    const filee = e.target.files[0];
    setFileHero(filee);
    console.log(fileHero);
  };
  const handleFileChange2 = async (e) => {
    setFileCarousel(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fileHero) {
      alert("Pilih file terlebih dahulu!");
      return;
    }
    try {
      const formData = new FormData();
      formData.append('file', fileHero);

      const data = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/file", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (data?.data) {
        const message = await axios.put(process.env.NEXT_PUBLIC_API_URL + "/api/home/"+id, {
          hero_section: data?.data,
          carousel: file2
        },{})
        if (message.data == "success") {
          window.location.reload()
        }
      }
    } catch (err) {
      console.log(err.message)
    }

  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    if (!fileCarousel) {
      alert("Pilih file terlebih dahulu!");
      return
    }
    const formData = new FormData();
    formData.append('file', fileCarousel);

    try {
      const data = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/file",formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (data.data) {
        let newData = [...file2, data.data]
        const message = await axios.put(process.env.NEXT_PUBLIC_API_URL + "/api/home/"+id, {
          hero_section: file,
          carousel: newData
        })
        if (message.data == "success") {
          window.location.reload()
        }
      }
    } catch (err) {
      console.log(err.message)
    }
  };

  const onDelete = async (i)=>{
    try{
      let newData = [...file2]
      newData.splice(i,1)
      const message = await axios.put(process.env.NEXT_PUBLIC_API_URL + "/api/home/"+id, {
        hero_section: file,
        carousel: newData
      })
      if (message.data == "success") {
        window.location.reload()
      }
    }catch(err){
      console.log(err.message)
    }
      
  }

  useEffect(() => {
    async function getData() {
      try {
        const data = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/home")
        setFile(data.data.hero_section)
        setFile2(data.data.carousel)
        console.log(data)
          setId(data.data._id)

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
      <div className="w-full">
        <div className="p-6 mt-8 text-center">
          <h1 className="text-3xl font-bold text-koreaBlue">HOME CONTENT</h1>
        </div>
        <div className="m-auto w-full">

          <div className=" m-auto bg-white p-6 rounded-lg shadow-lg w-[80%] border-2">

            <h2 className="text-3xl pt-5 font-semibold text-start mb-4">Foto Hero Section</h2>
            <Image alt="foto" src={`${process.env.NEXT_PUBLIC_API_FILE_URL}` + file} width={1000} height={500} />
            <form onSubmit={handleSubmit}>
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
                Update
              </button>
            </form>

            <h2 className="mt-16 text-3xl font-semibold text-start mb-4">Carousel</h2>
            <form onSubmit={handleSubmit2}>
              <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center">
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
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 mb-5"
              >
                Upload
              </button>
            </form>
            <div className="grid grid-cols-2 justify-items-center m-auto align-items-center items-center">
              {
                file2 && file2.map((v, i) => {
                  return (
                    <div className="grid grid-cols-1 justify-items-center w-[400px]" key={i}>
                      <Image className="mx-6 py-5" alt="foto" src={process.env.NEXT_PUBLIC_API_FILE_URL + v} width={300} height={300} />
                      <button className="w-20 m-auto w-[80%]" onClick={(e)=>onDelete(i)}>
                        <p className="text-sm text-center m-auto text-white bg-koreaRed p-2 rounded-2xl">Delete</p>
                      </button>
                    </div>
                  )
                })
              }
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}



