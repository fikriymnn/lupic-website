"use client"
import React, { useEffect, useState,use } from "react";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import axios from "axios";


export default function Pendaftarann({params}) {
  const {id} = use(params)
  const [tanggal, setTanggal] = useState("")
  const [peserta, setPeserta] = useState([])
  const dataJadwal = [
    { hari: 'Senin', tanggal: '14 April 2025', status: 'dibuka' },
    { hari: 'Rabu', tanggal: '16 April 2025', status: 'dibuka' },
    { hari: 'Jumat', tanggal: '18 April 2025', status: 'ditutup' },
  ];

  const onDelete = async (id) => {
    try {
      const data = await axios.delete(process.env.NEXT_PUBLIC_API_URL + "/api/peserta/" + id, { withCredentials: true });
      if (data.data) {
        alert("Berhasil menghapus peserta")
        window.location.reload()
      }
    } catch (err) {
      alert(err.message)
    }
  }

  useEffect(() => { 
    let arrayString = id.split("_")
    setTanggal(`${arrayString[0]} ${arrayString[1]} ${arrayString[2]} ${arrayString[3]}`)
    async function getData() {
      try {
        let arry = id.split("_")
        let hari = arry[0]
        let tanggal = arry[1]
        let bulan = arry[2]
        let tahun = arry[3] 
        const Data = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/peserta?hari=" + hari+"&tanggal="+tanggal+"&bulan="+bulan+"&tahun="+tahun, { withCredentials: true })
        if (Data.data) {
          setPeserta(Data.data)
        }
      } catch (err) {
        console.log(err.message)
      }
    }
    getData()
  }
  , [])
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-64 "></div>
      <div className="w-full mb-20">
        <div className="p-6 mt-8 text-center">
          <h1 className="text-3xl font-bold text-koreaBlue">Daftar Peserta {tanggal}</h1>
        </div>
        <div className="m-auto w-full">
          <div className=" m-auto bg-white p-3 rounded-lg w-[80%]">
              {/* List Peserta */}
              <div className="border shadow-md rounded-md mb-10">
                <div className="text-center bg-koreaBlue rounded-t-md text-white font-semibold border-b border-black py-4 grid grid-cols-7 justify-items-center px-5">
                <p>No</p>
                <p>Nama</p>
                <p>Tgl Lahir</p>
                <p>No Whatsapp</p>
                <p>Email</p>
                <p>Instansi</p>
                <p>Hapus</p>
                </div>
                <div className="p-3">
                  {peserta.map((v, idx) => (
                    <div key={idx} className="shadow-md mx-1 my-2 px-1 py-2 rounded grid grid-cols-7 justify-items-center">
                      <p>{idx+1}</p>
                      <p>{v.nama}</p>
                      <p>{v.tgl_lahir}</p>
                      <p>{v.no_wa}</p>
                      <p>{v.email}</p>
                      <p>{v.instansi}</p>
                      <button className="px-2 py-1 shadow-md bg-red-600 rounded-md text-sm relative right-0 hover:bg-red-400 text-white ml-4" onClick={(e) => { onDelete(v._id) }}>Hapus</button>
                    </div>
                  ))}
                </div>
            </div>
          </div>
        </div>
      </div >

    </div >
  );
}