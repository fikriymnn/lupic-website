"use client"
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Editor from "react-simple-wysiwyg";
import AdminCardFacilities from "@/components/card/AdminCardFacilities";
import AdminCardNews from "@/components/card/AdminCardNews";
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import axios from "axios";


export default function Event() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages,setTotalPages] = useState(1)
  const [data, setData] = useState([]);
  const [search,setSearch] = useState("")


  useEffect(() => {
    async function getData() {
      try {
        const Data = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/event?" + "page=" + currentPage )
        const Data2 = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/event")
        if (Data.data&&Data2.data) {
          setData(Data.data)
          setTotalPages(Math.ceil(Data2.data.length/9))
        }
      } catch (err) {
        console.log(err.message)
      }
    }
    getData()

  }, [currentPage])

 

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-64"></div>
      <div className="w-full">
        <div className="p-6 mt-8 text-center">
          <h1 className="text-3xl font-bold text-koreaBlue">EVENT</h1>
        </div>
        <div className="m-auto w-full">

          <div className=" m-auto bg-white p-6 rounded-lg shadow-lg w-[80%] border-2">
            <button
              onClick={(e) => { window.location.href = "/lgndmn/dashboard/event/add_event" }}
              className="mt-4 mb-5 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 my-5 w-[80%]"

            >
              Tambahkan Event
            </button>
            <div className="grid grid-cols-2 justify-items-center">
              {
                data && data.map((v, i) => {
                  return (
                    <AdminCardNews gambar={v.gambar} judul={v.judul} content={v.content} tanggal={v.tanggal} id={v._id} key={i} />
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

